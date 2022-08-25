import { CertificateDto } from "../../dto/certificateDto";
import { TransactionDto } from "../../dto/transactionDto";
import { web3Service } from "../../services/web3/web3Service";
import { CertificateEth, fromDto } from "../../models/blockchain/certificateEth";
import { Certificate } from "../../models/certificate";
import { BlockchainTransaction } from "../../models/transaction";

export const CertificateService = {
    async getCertificatesByStudentId(id: number) {
        try {


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
        try {
            // VALIDACIONES: IDEMPOTENCIA: 2 Certificados iguales al mismo estudiante. -> Obtener los certificados por estudiante (primero local y luego en blockchain)

            // Se publica la transaccion en blockchain.
            const ethCertificate: CertificateEth = fromDto(certificateData);
            const signed = await web3Service.createSignTransaction(ethCertificate);

            // Una vez validada la firma. Creo el certificado en la base.
            const newCertificate = new Certificate(
                {
                    fullname: certificateData.student.name + " " + certificateData.student.lastname,
                    docNumber: certificateData.student.docNumber,
                    universityName: certificateData.universityName,
                    academicUnit: certificateData.academicUnit,
                    degreeProgramName: certificateData.degreeProgramName,
                    degreeProgramCurriculum: certificateData.degreeProgramCurriculum,
                    degreeProgramOrdinance: certificateData.degreeProgramOrdinance,
                    degreeType: certificateData.degreeType,
                    degreeName: certificateData.degreeName,
                    ministerialOrdinance: certificateData.ministerialOrdinance,
                    dateCreated: new Date().toISOString(),
                    dateModified: new Date().toISOString(),
                    waferNumber: certificateData.waferNumber,
                    volumeNumber: certificateData.volumeNumber,
                    recordNumber: certificateData.recordNumber,
                    status: 'ACT',
                } as Certificate
            );
            const certificateResponse = await newCertificate.save();

            // Creo la transaccion en la base.
            const transaction = new BlockchainTransaction(
                {
                    transactionHash: signed.transactionHash,
                    ceritificateId: certificateResponse.id,
                    status: 'PENDING',
                } as BlockchainTransaction
            );
            const transactionResponse = await transaction.save();

            // Envio a publicar la transaccion.
            const [resultCertificate, receipt] = await web3Service.sendTransaction(signed);

            transactionResponse.set({
                status: 'COMPLETED',
                ceritificateBlockchainId: resultCertificate?.id,
                blockNumber: receipt.blockNumber,
                blockHash: receipt.blockHash,
                from: receipt.from,
                gasUsed: receipt.gasUsed,
            });

            await transactionResponse.save();

            // Con el resultado de la transaccion, actualizamos la transaccion y el certificado.






            // const [newCertificate, receipt] = await web3Service.createCertificate(certificateData);

            // Validamos el retorno de la misma corroborando en errores.


            // Obtenemos datos de la blockchain como numero de bloque, num de transaccion, hashes, costo de gas de la transacción y etc que hagan falta.
            // Guardamos esa informacion en la base. Entidad TRANSACITON.


            // Hacer el backup en la bd local.
            // verificar con dni o identificador particular. 
            // Quien es el estudiante? Si existe en el sistema, creamos la relacion y el certificado.
            // Si no existe en el sistema, se crea la persona y por lo tanto, el estudiante con los datos del certificado unicamente.

            const transactionRes = {
                receipt: transactionResponse,
                certificate: certificateData
            } as TransactionDto
            return transactionRes;
        } catch (error) {
            throw error;
        }
    },

    async deleteCertificate(id: number) {
        try {

        } catch (error) {
            throw error;
        }
    },

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