import { Request, Response } from "express";
import { getErrorMessage } from "../utils/manageError";
import { CertificateDto } from "../dto/certificateDto";
import { CertificateService } from "../services/certificates/certificatesService";
import { StudentService } from "../services/student/studentService";
import { BlockchainTransaction } from "models/transaction";
import { BlockchainTransactionDto } from "dto/blockchainTransactionDto";

export const certificateController = {

    async create(req: Request, res: Response) {
        try {
            // todo: Funcion para validar permisos.
            validateFields(req.body);
            // Todo: Crear Dto a partir del req.body y ahi verificar los datos.
            const transactionRes = await CertificateService.createCertificate(req.body as CertificateDto);

            // const newCertificate = await CertificateService.createCertificate(req.body as CertificateDto);
            res.status(200).json(transactionRes);
        } catch (error) {
            console.log(error)
            res.setHeader('Content-Type', 'application/json');
            res.status(409).json(getErrorMessage(error));
        }
    },

    async delete(req: Request, res: Response) {
        try {

        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(409).json(getErrorMessage(error));
        }
    },
    async getAll(req: Request, res: Response) {
        try {
            const certificates = await CertificateService.getAllCertificates();
            res.status(200).json(certificates);
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(409).json(getErrorMessage(error));
        }
    },
    async getByDocNumber(req: Request, res: Response) {
        try {
            let transactions: BlockchainTransactionDto[] = [];
            const studentDocNumber = req.params.docNumber;
            const student = await StudentService.getStudentByDocNumber(studentDocNumber);
            if (student.length > 0) {
                transactions = await CertificateService.getCertificatesByStudentId(Number(student[0].id));
            }
            // const studentId = Number(studentDocNumber);
            // const certificates = await web3Service.getCertificatesByStudentId(studentId);
            res.status(200).json(transactions);
        } catch (error) {
            console.error(error);
            res.setHeader('Content-Type', 'application/json');
            res.status(409).json(getErrorMessage(error));
        }
    },
}

function validateFields(certificate: CertificateDto) {
    if (!certificate.student) {
        throw new Error('Debe seleccionar una facultad');
    }
    if (!certificate.degreeName) {
        throw new Error('Debe ingresar el nombre del titulo');
    }
    if (!certificate.student.universityName) {
        throw new Error('Debe seleccionar una facultad');
    }
    if (!certificate.degreeName) {
        throw new Error('Debe seleccionar una facultad');
    }
    if (!certificate.student.degreeProgramCurriculum) {
        throw new Error('Debe seleccionar una facultad');
    }
    if (!certificate.student.degreeProgramOrdinance) {
        throw new Error('Debe ingresar el nombre de la carrera');
    }
    if (!certificate.student) {
        throw new Error('Debe ingresar los datos del estudiante');
    }
    if (!certificate.student.person.name) {
        throw new Error('Debe seleccionar una institucion');
    }
    if (!certificate.student.person.docNumber) {
        throw new Error('Debe el numero de documento del estudiante');
    }
}
