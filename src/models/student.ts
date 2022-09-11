import { Table, Model, Column, DataType, ForeignKey, HasMany, HasOne, BelongsTo } from 'sequelize-typescript'
import { Certificate } from './certificate';
import { Person } from './person';
import { StudentDto } from "../dto/studentDto";

@Table({
    timestamps: false,
    tableName: "student"
})
export class Student extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    universityName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    academicUnit!: string; // Facultad

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    degreeProgramName!: string; // Nombre de la carrera

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    degreeProgramCurriculum!: string; // Plan de estudios

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    degreeProgramOrdinance!: string; // Ordenanza

    // RELACIONES
    @HasMany(() => Certificate)
    certificates: Certificate[] | undefined;

    @ForeignKey(() => Person)
    @Column({
        type: DataType.INTEGER
    })
    personId!: number

    @BelongsTo(() => Person, "personId")
    person!: Person

    static toDto(student: Student): StudentDto {
        return {
            id: student.id,
            universityName: student.universityName,
            academicUnit: student.academicUnit,
            degreeProgramCurriculum: student.degreeProgramCurriculum,
            degreeProgramName: student.degreeProgramName,
            degreeProgramOrdinance: student.degreeProgramOrdinance,
        } as StudentDto;
    }
    static toDtoList(students: Student[]): StudentDto[] {
        return students.map(s => {
            return {
                id: s.id,
                person: Person.toDto(s.person),
                universityName: s.universityName,
                academicUnit: s.academicUnit,
                degreeProgramCurriculum: s.degreeProgramCurriculum,
                degreeProgramName: s.degreeProgramName,
                degreeProgramOrdinance: s.degreeProgramOrdinance,
            } as StudentDto;
        })

    }

}