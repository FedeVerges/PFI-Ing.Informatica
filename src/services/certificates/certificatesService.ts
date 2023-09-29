import { CertificateDto } from '../../dto/certificateDto';
import { TransactionDto } from '../../dto/transactionDto';
import { web3Service } from '../../services/web3/web3Service';
import {
  CertificateEth,
  fromDto
} from '../../models/blockchain/certificateEth';
import { Certificate } from '../../models/certificate';
import { BlockchainTransaction } from '../../models/blockchainTransaction';
import { TransactionReceipt, SignedTransaction } from 'web3-core';
import { StudentService } from '../student/studentService';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // import locale
import { BlockchainTransactionDto } from '../../dto/blockchainTransactionDto';
import { notificationService } from '../../services/notifications/notificationService';
import { NotificationDto } from '../../dto/notificationDto';
import { pdfService } from '../../services/pdf/pdfService';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PdfDto } from 'dto/pdfDto';
import * as CryptoJS from 'crypto-js';
import { CERTIFICATE_STATUS } from '../../enum/certificateStatus';
import { TRANSACTION_STATUS } from '../../enum/transactionStatus';
import { img } from '../../assets/img/logo_crop_64';
import { background } from '../../assets/img/certificate_background';

dayjs.locale('es');

const image64Txt = img;
const backgroundPdf = background;

export const CertificateService = {
  /**
   * Obtiene los certificados en blockchain y las transacciones.
   * @param id - blochainId del estudiante.
   * @returns Listado de transacciones.
   */
  async getCertificatesByStudentId(id: number) {
    // Obtengo los certificados de la blockchain.
    const certificates = await web3Service.getCertificatesByStudentId(id);

    const transactions: BlockchainTransactionDto[] = await Promise.all(
      certificates
        .filter((c) => !this.isNullCertificate(c))
        .map(async (c) => {
          return await this.getTrasactionDataByCertificate(c);
        })
    );

    // // Obtengo los ids.
    // const ids = certificates.map((c) => Number(c.id));

    // // Obtengo las datos de las transacciones de cada certificado (a traves del id). Se conecta a DB local.

    // /* Cuando no hay transacciones pero si hay certificados,
    //   recuperar la info y devolverla pero sin informacion en el sistema.
    // */
    // if (transactions && transactions.length > 0) {
    //   return BlockchainTransaction.toDtoList(transactions);
    // } else {
    //   return certificates.map((c) => fromDto(c));
    // }

    return transactions;
  },
  /**
   * Aparte de saber lo que esta almacenado en blockchain, hay que saber los datos transaccionales de los mismos.
   * Para eso hay que buscar en la base esos datos y mostrarlos.
   *
   * IDEALMENTE SE DEBERIA ALMACENAR TODO EN EL CONTRATO PERO ESO QUEDA PARA MAS ADELANTE.
   * @param id idblockchain del certificado
   * @returns
   */
  async getCertificateById(id: number) {
    const certificate = await web3Service.getCertificatesById(id);
    let transactionData: BlockchainTransactionDto | null = null;
    // validar que el dato sea nulo.
    if (!this.isNullCertificate(certificate)) {
      transactionData = await this.getTrasactionDataByCertificate(certificate);
    }
    return transactionData;
  },
  /**
   * Crea un nuevo certificado temporal y envia la transaccion a la blockchain.
   * @param certificateData
   * @returns
   */
  async createCertificate(
    certificateData: CertificateDto
  ): Promise<TransactionDto> {
    // VALIDACIONES: IDEMPOTENCIA: 2 Certificados iguales al mismo estudiante. -> Obtener los certificados por estudiante (primero local y luego en blockchain)
    // const student = await StudentService.getStudentById(certificateData.student.id);
    const student = await StudentService.getStudentById(
      certificateData.student.id
    );

    //TODO: hacer get a la blockchain para obtener los titulos.
    /**
     * Control de idempotencia propio.
     * El get a la blockchain trae CertificateEth. Validar esos CertificateETH contra el que vas a enviar.
     * Controlar que las obleas no sean las mismas.
     *
     * Idempotencia general: No debe poder crearse un certificado con el mismo numero de oblea.
     *
     * Solucion 1: Usar el numero de oblea como id de certificado en vez de un secuencial.
     */
    if (!student) throw new Error('No existe el estudiante');

    let signed: SignedTransaction;
    let ethCertificate: CertificateEth;
    if (this.validateCertificates(student.certificates, certificateData)) {
      // Creamos la transaccion
      try {
        ethCertificate = fromDto(certificateData);
        signed = await web3Service.createSignCreateTransaction(ethCertificate);
      } catch (ex) {
        console.error(ex);
        throw new Error('Ha ocurrido un error al conectarse con la red');
      }

      const currentDateStr = dayjs(new Date()).toString();
      // TODO: Eliminar. Ya no se guardan certificados en la base.
      // Una vez validada la firma. Creo el certificado en la base.
      const newCertificate = new Certificate({
        degreeType: certificateData.degreeType,
        degreeName: certificateData.degreeName,
        ministerialOrdinance: certificateData.student.ministerialOrdinance,
        dateCreated: currentDateStr,
        dateModified: currentDateStr,
        waferNumber: certificateData.waferNumber,
        studentId: student.id,
        student,
        status: CERTIFICATE_STATUS.PENDING
      });
      await newCertificate.save();

      // Creo la transaccion en la base.
      if (signed) {
        /**
         * Todo: desacoplar logica de guardado de transaccion.
         */
        const transaction: BlockchainTransaction = new BlockchainTransaction({
          transactionHash: signed.transactionHash,
          methodName: 'CREATE',
          studentName: `${student.person.name} ${student.person.lastname}`,
          status: TRANSACTION_STATUS.PENDING,
          dateCreated: new Date(),
          dateModified: new Date()
        });
        const transactionResponse = await transaction.save();
        /**
         * Envio a publicar la transaccion.
         *
         * Mandar a publicar la trnasaccion de manera asincrona.
         */
        //
        web3Service
          .sendTransaction(signed)
          .then(
            async ([resultCertificate, receipt]) =>
              await this.updateStateTransaction(
                transactionResponse,
                resultCertificate,
                receipt
              )
          );
      } else {
        throw new Error('Ha ocurrido un error al crear la firma');
      }
      //Mientras tranto, se informa al usuario la publicacion de la transaccion y el estado (Pendiente).
      return {
        receipt: {},
        certificate: certificateData,
        status: TRANSACTION_STATUS.PENDING
      } as TransactionDto;
    } else {
      throw new Error(' Ya existe un certificado con el mismo nombre.');
    }
  },

  async updateStateTransaction(
    transactionResponse: BlockchainTransaction,
    resultCertificate: Partial<CertificateEth> | null,
    receipt: TransactionReceipt
  ) {
    // Con el resultado de la transaccion, actualizamos la transaccion y el certificado.
    const ret = await transactionResponse.update({
      status: TRANSACTION_STATUS.COMPLETED,
      ceritificateBlockchainId: resultCertificate?.id || 0,
      blockNumber: receipt.blockNumber,
      blockHash: receipt.blockHash,
      from: receipt.from,
      gasUsed: receipt.gasUsed,
      dateModified: dayjs(new Date()).toString()
    });
    const notification: NotificationDto = {
      type: 'TRANSACTION',
      transactionHash: ret.transactionHash,
      status: ret.status
    };
    notificationService.sendNotification(1, notification);
  },

  /**
   *
   * @param id id de la base de datos.
   * @returns
   */
  async deleteCertificate(id: number) {
    let ret: Partial<TransactionDto> = {
      status: TRANSACTION_STATUS.PENDING
    };

    const certificate = await web3Service.getCertificatesById(id);
    // creo la transaccion.
    let signed: SignedTransaction;
    signed = await web3Service.createSignDeleteTransaction(id);

    // Creo la transaccion en la base.
    if (signed) {
      const transaction: BlockchainTransaction = new BlockchainTransaction({
        transactionHash: signed.transactionHash,
        methodName: 'DELETE',
        studentName: `${certificate.student.name} ${certificate.student.lastname}`,
        ceritificateBlockchainId: id,
        status: TRANSACTION_STATUS.PENDING,
        dateCreated: new Date(),
        dateModified: new Date()
      });
      const transactionResponse = await transaction.save();
      // Envio a publicar la transaccion.
      // Mandar a publicar la trnasaccion de manera asincrona.
      web3Service
        .sendTransaction(signed)
        .then(
          async ([resultCertificate, receipt]) =>
            await this.updateStateTransaction(
              transactionResponse,
              resultCertificate,
              receipt
            )
        );

      ret.receipt = BlockchainTransaction.toDto(transaction);
    } else {
      throw new Error('Ha ocurrido un error al crear la firma');
    }
    return ret;
  },

  createUpdateStudent(studentId: number) {
    // Obtener el estudiante por id.
    // Si existe, verifico que el la idempotencia del titulo.
  },

  async getAllTransaction(): Promise<BlockchainTransactionDto[]> {
    const transactions = await BlockchainTransaction.findAll({
      order: [['dateModified', 'DESC']]
    });
    return BlockchainTransaction.toDtoList(transactions);
  },

  /**
   * Verifica la idempotencia de los certificados.
   * Filtra aquellos que posean valores que no puedan ser repetidos.
   * No pueden existir dos certificados iguales.
   * @param certfificates Lista de certificados del estudiante
   * @param newCertificate Nuevo certificado a crear.
   */
  validateCertificates(
    certfificates: Certificate[] | undefined,
    newCertificate: CertificateDto
  ): boolean {
    let ret = false;
    if (certfificates && certfificates.length > 0) {
      // Mismo numero de oblea o mismo estudiante y misma carrera.
      const results = certfificates.filter(
        (c) =>
          c.waferNumber === newCertificate.waferNumber ||
          (c.student.id === newCertificate.student.id &&
            c.degreeName === newCertificate.degreeName)
      );
      ret = results.length < 1;
    } else {
      ret = true;
    }
    return ret;
  },

  async createCertificatePdf(id: number): Promise<PdfDto | null> {
    const transaction = await CertificateService.getCertificateById(Number(id));
    if (transaction) {
      return this.generatePDF(transaction);
    } else {
      throw new Error('El certificado no existe.');
    }
  },

  async generatePDF(transaction: BlockchainTransactionDto) {
    const documentEndoded = CryptoJS.enc.Utf8.parse(
      JSON.stringify({
        ceritificateBlockchainId: transaction.certificateBlockchainId
      })
    ); // encodedWord Array object
    const encoded = CryptoJS.enc.Base64.stringify(documentEndoded);
    // string: 'NzUzMjI1NDE='

    const docDefinition: TDocumentDefinitions = {
      pageSize: {
        width: 800,
        height: 600
      },
      // ownerPassword: '1234',
      permissions: {
        printing: 'highResolution',
        modifying: false,
        copying: false,
        contentAccessibility: true,
        documentAssembly: true
      },
      background: {
        // if you specify width, image will scale proportionally
        image: backgroundPdf,
        width: 800,
        height: 600
      },
      content: [
        {
          // if you specify width, image will scale proportionally
          image: image64Txt,
          fit: [100, 100]
        },
        {
          text: `Universidad Nacional de San Luis `,
          style: ['title']
        },

        {
          text: [
            {
              text: `Se le concede a `
            },
            {
              text: ` ${transaction.studentName} `,
              bold: true
            },
            {
              text: ` el título profesional de `
            },
            // {
            //   text: ` ${transaction.certificate?.student.degreeProgramName} `,
            //   bold: true
            // },
            {
              text: `considerando que ha cumplido con los estudios correspondientes y satisfecho todos los requisitos necesarios`
            }
          ],
          marginBottom: 20
        },
        {
          text: `Escaneá este codigo QR para verficar la valides de este documento.`,
          style: ['small']
        },
        {
          qr: `${process.env.CLIENT_URL}/validate/${encoded}`,
          version: 15,
          fit: 200,
          margin: [0, 15]
        }
      ],
      defaultStyle: {
        font: 'MyFont',
        alignment: 'center',
        fontSize: 16
      },
      styles: {
        small: {
          fontSize: 14
        },
        textMuted: {
          color: '#8e8c8c',
          fontSize: 14
        },
        textBold: {
          bold: true
        },
        h4: {
          fontSize: 22
        },
        title: {
          fontSize: 32,
          marginBottom: 20
        }
      }
    };
    return {
      name: `${transaction.studentName}_Certificado${transaction.certificateBlockchainId}.pdf`,
      document: await pdfService.createPdf(docDefinition)
    };
  },
  async getTrasactionDataByCertificate(c: CertificateEth) {
    let trans = await BlockchainTransaction.findOne({
      where: {
        ceritificateBlockchainId: c.id
      }
    });
    /**
     * TODO: Pueden haber certificados sin registro de transacciones???
     */
    return BlockchainTransaction.toDto(trans || undefined, c);
  },
  isNullCertificate(certificate: CertificateEth): boolean {
    return (
      certificate &&
      certificate.active === false &&
      certificate.createdAt <= 0 &&
      Number(certificate.id) === 0 &&
      certificate.student.name === '' &&
      certificate.updatedAt <= 0 &&
      certificate.waferNumber === ''
    );
  }
};
