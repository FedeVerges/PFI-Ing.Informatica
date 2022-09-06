import {Request, Response} from "express";
import {CertificateService} from "../services/certificates/certificatesService";
import {getErrorMessage} from "../utils/manageError";
import {web3Service} from "../services/web3/web3Service";
import {StudentService} from "../services/student/studentService";
import {StudentDto} from "../dto/studentDto";
import {Student} from "../models/student";

export const studentController = {
    async create(req: Request, res: Response) {
        try {
            // todo: Funcion para validar permisos.
            // Todo: Crear Dto a partir del req.body y ahi verificar los datos.
            const student = await StudentService.createStudent(req.body as StudentDto);
            res.status(200).json(student.toDto());
        } catch (error) {
            console.log(error)
            res.setHeader('Content-Type', 'application/json');
            res.status(409).json(getErrorMessage(error));
        }
    },
    async getAll(req: Request, res: Response) {
        try {
            const students = await StudentService.getAllStudents();
            res.status(200).json(students);
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(409).json(getErrorMessage(error));
        }
    },
    async getByDocNumber(req: Request, res: Response) {
        try {
            const studentDocNumber = req.params.docNumber;
            const certificates = await StudentService.getStudentByDocNumber(studentDocNumber);
            res.status(200).json(certificates);
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(409).json(getErrorMessage(error));
        }
    },

}