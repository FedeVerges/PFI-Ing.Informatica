import { UserDto } from 'dto/userDto';
import { StudentDto } from '../../dto/studentDto';
import { Person } from '../../models/person';
import { Student } from '../../models/student';
import { UserService } from '../../services/user/userService';
import { Degree } from '../../models/degree';
import { Op } from 'sequelize';

export const StudentService = {
  async getStudentById(id: number) {
    if (!id) {
      throw new Error('El identificador es invalido.');
    }
    const foundStudent = await Student.findOne({
      where: { registrationNumber: id },
      include: [Person, Degree]
    });
    if (foundStudent && foundStudent.id) {
      return foundStudent;
    } else {
      throw new Error('El estudiante no existe.');
    }
  },
  async getAllStudents() {
    try {
      return Student.findAll();
    } catch (e) {
      throw new Error('Ha ocurrido un error al obtener los estudiantes.');
    }
  },

  async getStudentByDocNumber(docNumber: string, hasCertificate: boolean) {
    if (!docNumber) {
      throw new Error('Deben existir usuario y contraseña');
    }
    if (docNumber.length < 8) {
      throw new Error('El dni es incorrecto');
    }
    let foundStudents: Student[] = [];
    if (hasCertificate) {
      foundStudents = await Student.findAll({
        include: [
          { model: Person, where: { docNumber }, required: true },
          { model: Degree, required: true }
        ]
      });
    } else {
      foundStudents = await Student.findAll({
        where: { blockchainId: { [Op.is]: null } },
        include: [
          { model: Person, where: { docNumber }, required: true },
          { model: Degree, required: true }
        ]
      });
    }

    return foundStudents;
  },

  async getStudentByBlockchainId(blockchainId: string) {
    if (!blockchainId) {
      throw new Error('Deben existir usuario y contraseña');
    }
    if (blockchainId.length < 8) {
      throw new Error('El dni es incorrecto');
    }
    const foundStudents = await Student.findAll({
      include: {
        model: Person,
        where: { blockchainId: blockchainId },
        required: true
      }
    });
    return foundStudents;
  },

  async updateStudentBlockchainId(
    blockchainId: string,
    docNumber: string,
    degreeName: string
  ) {
    const student = await Student.findOne({
      include: [
        { model: Person, where: { docNumber } },
        { model: Degree, where: { name: degreeName } }
      ]
    });
    if (student && !student.blockchainId) {
      student.blockchainId = String(blockchainId);
      await student.save();
    } else {
      throw new Error('El estudiante ya tiene numero blockchain.');
    }
  },

  async deleteStudent(docNumber: string) {},

  async createStudent(studentData: StudentDto) {
    let person: Person;
    let newStudent: Student;
    // const blockchainId: string = String(
    //   studentData.person.docNumber + studentData.registrationNumber
    // );
    // busco a la persona.
    const findedPerson = await Person.findOne({
      where: {
        docNumber: studentData.person.docNumber,
        docType: studentData.person.docType
      },
      include: [{ model: Student, include: [{ model: Degree }] }]
    });

    let degree: Degree | null = await Degree.findOne({
      where: {
        name: studentData.degreeProgramName,
        academicUnit: studentData.academicUnit,
        type: studentData.degreeType,
        planId: studentData.degreeProgramCurriculum
      }
    });
    // Si no existe, creo uno nuevo
    if (!degree) {
      degree = new Degree({
        name: studentData.degreeProgramName,
        academicUnit: studentData.academicUnit,
        type: studentData.degreeType,
        planId: studentData.degreeProgramCurriculum,
        university: studentData.universityName
      });
      degree = await degree.save();
    }

    if (findedPerson) {
      // Valido datos de la persona.
      if (
        findedPerson.name === studentData.person.name &&
        findedPerson.lastname === studentData.person.lastname &&
        findedPerson.sex === studentData.person.sex
      ) {
        person = findedPerson;
        if (person.students && person.students.length > 0) {
          // Busco por el mismo numero de estudiante y blockchainId.
          const filteredStudents = person.students.filter(
            (s) =>
              (s.degree && s.degree.name === studentData.degreeProgramName) ||
              s.registrationNumber == studentData.registrationNumber
          );

          // Si no hay coincidencias. Lo agrego.
          if (!filteredStudents || filteredStudents.length < 1) {
            newStudent = new Student({
              personId: person.id,
              createdAt: new Date(),
              updatedAt: new Date(),
              registrationNumber: studentData.registrationNumber,
              degreeId: degree.id
            });
            await newStudent.save();
          } else {
            throw new Error('El estudiante ya existe.');
          }
        } else {
          newStudent = new Student({
            personId: person.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            registrationNumber: studentData.registrationNumber,
            degreeId: degree.id
          });
          newStudent = await newStudent.save();

          // Creo usuario temporal.
          const userDto: UserDto = {
            name: newStudent.person.docNumber,
            // password: `${newStudent.person.lastname}${newStudent.person.docNumber}`,
            password: '1234',
            person: Person.toDtoWithStudents(newStudent.person)
          };

          await UserService.signUser(userDto);
        }
      } else {
        throw new Error('La persona ya existe. ');
      }
    } else {
      newStudent = new Student(
        {
          person: {
            name: studentData.person.name,
            lastname: studentData.person.lastname,
            docType: studentData.person.docType,
            sex: studentData.person.sex,
            docNumber: studentData.person.docNumber
          } as Person,
          createdAt: new Date(),
          updatedAt: new Date(),
          registrationNumber: studentData.registrationNumber,
          degreeId: degree.id
        },
        {
          include: [{ model: Person, required: true }]
        }
      );
      await newStudent.save();

      // Creo usuario temporal.
      const userDto: UserDto = {
        name: newStudent.person.docNumber,
        // password: `${newStudent.person.lastname}${newStudent.person.docNumber}`,
        password: '1234',
        person: Person.toDtoWithStudents(newStudent.person)
      };

      await UserService.signUser(userDto);
    }
    return await this.getStudentById(newStudent.registrationNumber);
  }
};
