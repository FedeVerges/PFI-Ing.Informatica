import {CertificateDto} from "../../dto/certificateDto";
import {TransactionDto} from "../../dto/transactionDto";
import {web3Service} from "../../services/web3/web3Service";
import {CertificateEth, fromDto} from "../../models/blockchain/certificateEth";
import {Certificate} from "../../models/certificate";
import {BlockchainTransaction} from "../../models/transaction";
import {TransactionReceipt} from "web3-core";

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
            // Mandar a publicar la trnasaccion de manera asincrona.
            web3Service.sendTransaction(signed)
                .then(
                    async ([resultCertificate, receipt]) =>
                        this.updateStateTransaction(transactionResponse, resultCertificate, receipt));

            //Todo: Mientras tranto, se informa al usuario la publicacion de la transaccion y el estado (Pendiente).
            const transactionRes = {
                receipt: transactionResponse,
                certificate: certificateData
            } as TransactionDto
            return transactionRes;
        } catch (error) {
            throw error;
        }
    },

    async updateStateTransaction(transactionResponse: BlockchainTransaction, resultCertificate: Partial<CertificateEth> | null, receipt: TransactionReceipt) {
        // Con el resultado de la transaccion, actualizamos la transaccion y el certificado.
        transactionResponse.set({
            status: 'COMPLETED',
            ceritificateBlockchainId: resultCertificate?.id,
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