import { Table, Model, Column, DataType, ForeignKey, HasMany, HasOne, BelongsTo } from 'sequelize-typescript'
import { Certificate } from './certificate';
import { Person } from './person';

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

}