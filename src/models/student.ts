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

    //    @BelongsTo(() => Person)
    //     person!: Person;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lastName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fullName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    docNumber!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    degreeName!: string;

    @HasMany(() => Certificate)
    certificates: Certificate[] | undefined;
}