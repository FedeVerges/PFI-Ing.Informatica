import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/manageError';
import { StudentService } from '../services/student/studentService';
import { StudentDto } from '../dto/studentDto';
import { Student } from '../models/student';
import { Person } from '../models/person';
import { Degree } from '../models/degree';

export const studentController = {
  async create(req: Request, res: Response) {
    try {
      const student = await StudentService.createStudent(
        req.body as StudentDto
      );
      res.status(200).json(Student.toDto(student));
    } catch (error) {
      console.log(error);
      res.setHeader('Content-Type', 'application/json');
      res.status(409).json(getErrorMessage(error));
    }
  },
  async getAll(req: Request, res: Response) {
    try {
      const students = await StudentService.getAllStudents();
      res.status(200).json(Student.toDtoList(students));
    } catch (error) {
      res.setHeader('Content-Type', 'application/json');
      res.status(409).json(getErrorMessage(error));
    }
  },
  async getByDocNumber(req: Request, res: Response) {
    try {
      const studentDocNumber = req.params.docNumber;
      const hasCertificate = req.params.hasCertificate === 'true';
      const students = await StudentService.getStudentByDocNumber(
        studentDocNumber,
        hasCertificate
      );
      res.status(200).json(Student.toDtoList(students));
    } catch (error) {
      console.error(error);
      res.setHeader('Content-Type', 'application/json');
      res.status(409).json(getErrorMessage(error));
    }
  },
  async getPersonByDocNumber(req: Request, res: Response) {
    try {
      const doc = req.params.docNumber;
      // busco a la persona.
      const findedPerson = await Person.findAll({
        where: { docNumber: doc },
        include: [{ model: Student, include: [{ model: Degree }] }]
      });
      if (findedPerson) {
        res.status(200).json(Person.toDtoListWithStudents(findedPerson));
      } else {
        throw new Error('La persona no existe.');
      }
    } catch (error) {
      res.setHeader('Content-Type', 'application/json');
      res.status(409).json(getErrorMessage(error));
    }
  }
};
