import { CertificateDto } from "dto/certificateDto";
import { Certificate } from "models/certificate";
import { Person } from "models/person";
import { Student } from "models/student";

export const CertificateService = {
    async getCertificatesByStudentId(id:number) {
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

    async createCertificate(certificateData: CertificateDto) {
        //Todo: Esta accion se realizara cuando la transaccion en la red se haya realizado con exito.
        try {
            // todo: Conectarse con el servicio de web3 y realizar la transaccion. Una vez de que la misma haya sido exitosa. Se realiza el alta oficial en el sistema.
            // Todo: Buscar estudiante por dni, si no existe. Crearlo.
            const student = new Student(
                {
                    name: certificateData.student.name,
                    lastName: certificateData.student.lastname,
                    fullName: `${certificateData.student.name} ${certificateData.student.lastname}`,
                    docNumber: certificateData.student.docNumber,
                } as Student
            )
            const certificate = new Certificate(
                {
                    name: certificateData.name,
                    institutionId: certificateData.institutionId,
                    degreeName: certificateData.degreeName,
                    dateCreated: new Date().toISOString(),
                    dateModified: new Date().toISOString(),
                    waferNumber: certificateData.waferNumber,
                    volumeNumber: certificateData.volumeNumber,
                    recordNumber: certificateData.recordNumber,
                    studentId: student.id,
                } as Certificate
            )
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