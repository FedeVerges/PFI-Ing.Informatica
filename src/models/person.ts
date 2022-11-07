import { PersonDto } from "dto/personDto";
import { Table, Model, Column, DataType, BelongsTo, ForeignKey, HasOne, HasMany } from "sequelize-typescript";
import { Student } from "./student";
import { User } from "./user";

@Table({
    timestamps: false,
    tableName: "person"
})
export class Person extends Model {
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
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lastname!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    docNumber!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    sex!: string;

    @Column({
        type: DataType.STRING,
    })
    genderIdentity: string | undefined;

    @HasMany(() => Student, "personId")
    students!: Student[]

    @HasOne(() => User)
    user!: User;

    static toDto(p: Person): PersonDto {
        let person: PersonDto;
        if (p) {
            person = {
                id: p.id,
                name: p.name,
                lastname: p.lastname,
                fullname: `${p.name} ${p.lastname}`,
                docNumber: p.docNumber,
                sex: p.sex,
                genderIdentity: p.genderIdentity,
            };
        } else {
            throw new Error('No existe la persona.')
        }
        return person;
    }
}