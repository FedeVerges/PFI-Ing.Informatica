import {Table, Model, Column, DataType, BelongsTo, ForeignKey, HasOne, HasMany} from "sequelize-typescript";
import {Student} from "./student";
import {User} from "./user";

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
    lastName!: string;

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
        allowNull: true,
    })
    genderIdentity: string | undefined;

    @HasMany(() => Student)
    student!: Student[]

    @HasOne(() => User)
    user!: User;

}