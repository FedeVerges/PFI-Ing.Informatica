import { CertificateDto } from "../../dto/certificateDto";
import { TransactionDto } from "../../dto/transactionDto";
import { web3Service } from "../../services/web3/web3Service";
import { CertificateEth, fromDto } from "../../models/blockchain/certificateEth";
import { Certificate } from "../../models/certificate";
import { BlockchainTransaction } from "../../models/transaction";
import { TransactionReceipt, SignedTransaction } from "web3-core";
import { StudentService } from "../student/studentService";
import { Student } from "../../models/student";
import { Person } from "../../models/person";
import dayjs from 'dayjs';
import 'dayjs/locale/es' // import locale
dayjs.locale('es');

export const CertificateService = {
    async getCertificatesByStudentId(id: number) {
        try {
            const certificates = await Certificate.findAll({ include: { model: Student, where: { id }, required: true } })
            const ids = certificates.map(c => c.id);
            const t = await BlockchainTransaction.findAll({
                include: [
                    {
                        model: Certificate,
                        as: "certificate",
                        where: {
                            id: ids
                        },
                        required: true,
                        include: [{
                            model: Student,
                            required: true,
                            include: [
                                {
                                    model: Person,
                                    required: true,
                                }
                            ]
                        }]
                    }
                ]
            }
            );
            return BlockchainTransaction.toDtoList(t)
        } catch (error) {
            throw error;
        }
    },
    async getCertificatesById() {
        try {

        } catch (error) {
            throw error;
        }
    },

    async getAllCertificates() {
        try {

        } catch (error) {
            throw error;
        }
    },

    async createCertificate(certificateData: CertificateDto): Promise<TransactionDto> {
        // VALIDACIONES: IDEMPOTENCIA: 2 Certificados iguales al mismo estudiante. -> Obtener los certificados por estudiante (primero local y luego en blockchain)
        // const student = await StudentService.getStudentById(certificateData.student.id);
        const students = await StudentService.getStudentByDocNumber(certificateData.student.person.docNumber);
        const student = students[0];
        //Todo: Si no existe lo pateo.
        let signed: SignedTransaction;
        let ethCertificate: CertificateEth;
        if (this.validateCertificates(student.certificates, certificateData)) {
            // // Creamos la transaccion
            try {
                ethCertificate = fromDto(certificateData);
                signed = await web3Service.createSignTransaction(ethCertificate);
            } catch (ex) {
                console.error(ex);
                throw new Error('Ha ocurrido un error al conectarse con la red ');
            }


            // Una vez validada la firma. Creo el certificado en la base.
            const newCertificate = new Certificate(
                {
                    degreeType: certificateData.degreeType,
                    degreeName: certificateData.degreeName,
                    ministerialOrdinance: certificateData.ministerialOrdinance,
                    dateCreated: dayjs(new Date()).toString(),
                    dateModified: dayjs(new Date()).toString(),
                    waferNumber: certificateData.waferNumber,
                    volumeNumber: certificateData.volumeNumber,
                    recordNumber: certificateData.recordNumber,
                    studentId: student.id,
                    student,
                    status: 'ACT',
                });
            await newCertificate.save();

            // Creo la transaccion en la base.
            if (signed) {
                const transaction = new BlockchainTransaction(
                    {
                        transactionHash: signed.transactionHash,
                        ceritificateId: newCertificate.id,
                        status: 'PENDING',
                    } as BlockchainTransaction
                );
                const transactionResponse = await transaction.save();
                // Envio a publicar la transaccion.
                // Mandar a publicar la trnasaccion de manera asincrona.
                web3Service.sendTransaction(signed).then(
                    async ([resultCertificate, receipt]) =>
                        this.updateStateTransaction(transactionResponse, resultCertificate, receipt));

            } else {
                throw new Error('Ha ocurrido un error al crear la firma');
            }
            // Todo: Mientras tranto, se informa al usuario la publicacion de la transaccion y el estado (Pendiente).
            return {
                receipt: {},
                certificate: certificateData,
                status: 'pending',
            } as TransactionDto;
        } else {
            throw new Error(' Ya existe un certificado con el mismo nombre.')
        }
    },

    async updateStateTransaction(transactionResponse: BlockchainTransaction, resultCertificate: Partial<CertificateEth> | null, receipt: TransactionReceipt) {
        // Con el resultado de la transaccion, actualizamos la transaccion y el certificado.
        transactionResponse.set({
            status: 'COMPLETED',
            certificateBlockchainId: resultCertificate?.id,
            blockNumber: receipt.blockNumber,
            blockHash: receipt.blockHash,
            from: receipt.from,
            gasUsed: receipt.gasUsed,
        });
        await transactionResponse.save();

        // Validamos el retorno de la misma corroborando en errores.

    },

    async deleteCertificate(id: number) {
        try {

        } catch (error) {
            throw error;
        }
    },

    createUpdateStudent(studentId: number) {
        // Obtener el estudiante por id.
        // Si existe, verifico que el la idempotencia del titulo.
    },
    /**
     * Verifica la idempotencia de los certificados.
     * Filtra aquellos que posean valores que no puedan ser repetidos.
     * No pueden existir dos certificados iguales.
     * @param certfificates Lista de certificados del estudiante
     * @param newCertificate Nuevo certificado a crear.
     */
    validateCertificates(certfificates: Certificate[] | undefined, newCertificate: CertificateDto): boolean {
        let ret = false;
        if (certfificates && certfificates.length > 0) {
            //    Validaciones
            const results = certfificates.filter(c => c.ministerialOrdinance === newCertificate.ministerialOrdinance)
            ret = !results
        } else {
            ret = true;
        }
        return ret;
    }

}

// const student = new Student(
//     {
//         name: certificateData.student.name,
//         lastName: certificateData.student.lastname,
//         fullName: `${certificateData.student.name} ${certificateData.student.lastname}`,
//         docNumber: certificateData.student.docNumber,
//     } as Student
// )
// // Guarda estudiante.

// // Crea certificado.
// const certificate = new Certificate(
//     {
//         name: certificateData.degreeName,
//         institutionId: certificateData.institutionId,
//         degreeName: certificateData.degreeName,
//         dateCreated: new Date().toISOString(),
//         dateModified: new Date().toISOString(),
//         waferNumber: certificateData.waferNumber,
//         volumeNumber: certificateData.volumeNumber,
//         recordNumber: certificateData.recordNumber,
//         studentId: student.id,
//     } as Certificate
// )
// TODO: agregar nombre de Facultad y lookup.
// Nombre de plan y id.
// Ver como validar el acta y el tomo.