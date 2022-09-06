import {Table, Model, Column, DataType, ForeignKey, HasMany, HasOne, BelongsTo} from 'sequelize-typescript'
import {Certificate} from './certificate';
import {Person} from './person';
import {StudentDto} from "../dto/studentDto";

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
        type:DataType.INTEGER
    })
    personId!: number

    @BelongsTo(() => Person, "personId")
    person!: Person

    toDto(): StudentDto {
        return {
            id: this.id,
            universityName: this.universityName,
            academicUnit: this.academicUnit,
            degreeProgramCurriculum: this.degreeProgramCurriculum,
            degreeProgramName: this.degreeProgramName,
            degreeProgramOrdinance: this.degreeProgramOrdinance,
        } as StudentDto;
    }

}