import { CertificateDto } from "../../dto/certificateDto";
import { TransactionDto } from "../../dto/transactionDto";
import { web3Service } from "../../services/web3/web3Service";
import { CertificateEth, fromDto } from "../../models/blockchain/certificateEth";

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

            const ethCertificate:CertificateEth = fromDto(certificateData);
            // Realizamos la transaccion.
            const [newCertificate, receipt] = await web3Service.createCertificate(ethCertificate);

            // Validamos el retorno de la misma corroborando en errores.


            // Obtenemos datos de la blockchain como numero de bloque, num de transaccion, hashes, costo de gas de la transacción y etc que hagan falta.
            // Guardamos esa informacion en la base. Entidad TRANSACITON.


            // Hacer el backup en la bd local.
            // verificar con dni o identificador particular. 
            // Quien es el estudiante? Si existe en el sistema, creamos la relacion y el certificado.
            // Si no existe en el sistema, se crea la persona y por lo tanto, el estudiante con los datos del certificado unicamente.

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
            // Se guarda en la base.
            const transactionRes = {
                // receipt: newCertificate,
                // certificate: certificateData
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