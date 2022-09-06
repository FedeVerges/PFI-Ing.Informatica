import {StudentDto} from "../../dto/studentDto";
import {Person} from "../../models/person";
import {Student} from "../../models/student";

export const StudentService = {
    async getStudentById(id: number) {
        if (!id) {
            throw new Error('El identificador es invalido.');
        }
        const foundStudent = await Student.findOne({where: {id}});
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
            throw new Error('Ha ocurrido un error al obtener los estudiantes.')
        }
    },

    async getStudentByDocNumber(docNumber: string) {
        let students: Student[] = [];
        if (!docNumber) {
            throw new Error('Deben existir usuario y contraseña');
        }
        if (docNumber.length < 8) {
            throw new Error('El dni es incorrecto');
        }
        const foundPerson = await Person.findOne({where: {docNumber}, include: {model: Student, required: true},});

        if (foundPerson && foundPerson.id) {
            if (foundPerson.students && foundPerson.students.length > 0) {
                students = foundPerson.students
            } else {
                throw new Error('El estudiante no existe');
            }
        } else {
            throw new Error('La persona no existe');
        }
        return students;
    },

    async putStudent(docNumber: string) {
        try {

        } catch (error) {
            throw error;
        }
    },

    async deleteStudent(docNumber: string) {
        try {

        } catch (error) {
            throw error;
        }
    },

    async createStudent(studentData: StudentDto) {
        try {
            // todo: Agregar controles
            // Creo a la persona
            const person = new Person({
                name: studentData.person.name,
                lastname: studentData.person.lastname,
                sex: studentData.person.sex,
                docNumber: studentData.person.docNumber,
                documentType: studentData.person.documentType,
                genderIdentity: studentData.person.genderIdentity,
            });
            await person.save();

            //todo: consultar si existe, si no existe lo creo si no lo asocio.
            // antes de asociar debo consultar si hay otro igual.

            const newStudent = new Student({
                personId: person.id,
                createdAt: new Date(),
                updatedAt: new Date(),
                academicUnit: studentData.academicUnit,
                degreeProgramCurriculum: studentData.degreeProgramCurriculum,
                degreeProgramName: studentData.degreeProgramName,
                universityName: studentData.universityName,
                degreeProgramOrdinance: studentData.degreeProgramOrdinance,
            }, {
                include: [{model: Person}]
            });
            await newStudent.save()
            return newStudent;
        } catch (error) {
            throw error;
        }
    }
}