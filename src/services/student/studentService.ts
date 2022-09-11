import { StudentDto } from "../../dto/studentDto";
import { Person } from "../../models/person";
import { Student } from "../../models/student";

export const StudentService = {
    async getStudentById(id: number) {
        if (!id) {
            throw new Error('El identificador es invalido.');
        }
        const foundStudent = await Student.findOne({ where: { id } });
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
        const foundStudents = await Student.findAll({ include: { model: Person, where: { docNumber }, required: true } });
        return foundStudents;
    },

    async putStudent(docNumber: string) { },

    async deleteStudent(docNumber: string) { },

    async createStudent(studentData: StudentDto) {
        // todo: Agregar controles
        let person: Person;
        let newStudent: Student;
        // busco a la persona.
        const findedPerson = await Person.findOne({ where: { docNumber: studentData.person.docNumber }, include: Student },);

        if (findedPerson) {
            person = findedPerson
            // comparo informacion de los estudiantes asociados para encontrar coincidencias con el nuevo
            const filteredStudents = person.students
                .filter(s => s.degreeProgramName === studentData.degreeProgramName
                    && s.degreeProgramCurriculum === studentData.degreeProgramCurriculum
                    && s.degreeProgramOrdinance === studentData.degreeProgramOrdinance);
            if (!filteredStudents || filteredStudents.length < 1) {
                newStudent = new Student({
                    personId: person.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    academicUnit: studentData.academicUnit,
                    degreeProgramCurriculum: studentData.degreeProgramCurriculum,
                    degreeProgramName: studentData.degreeProgramName,
                    universityName: studentData.universityName,
                    degreeProgramOrdinance: studentData.degreeProgramOrdinance,
                });
                await newStudent.save();
            } else {
                throw new Error('El estudiante ya existe.')
            }

        } else {
            // Si no existe, la creo.
            person = new Person({
                name: studentData.person.name,
                lastname: studentData.person.lastname,
                sex: studentData.person.sex,
                docNumber: studentData.person.docNumber,
                documentType: studentData.person.documentType,
                genderIdentity: studentData.person.genderIdentity,
            });
            await person.save();
            newStudent = new Student({
                personId: person.id,
                createdAt: new Date(),
                updatedAt: new Date(),
                academicUnit: studentData.academicUnit,
                degreeProgramCurriculum: studentData.degreeProgramCurriculum,
                degreeProgramName: studentData.degreeProgramName,
                universityName: studentData.universityName,
                degreeProgramOrdinance: studentData.degreeProgramOrdinance,
            }, {
                include: [{ model: Person }]
            });
            await newStudent.save();
        }
        return newStudent;
    }
}