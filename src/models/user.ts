import {
    Table,
    Model,
    Column,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BeforeCreate,
    BeforeUpdate,
    BelongsTo, ForeignKey
} from "sequelize-typescript";
import bcrypt from 'bcrypt';
import {UserDto} from "dto/userDto";
import {Person} from "./person";
import {Role} from "./role";

@Table({
    timestamps: false,
    tableName: "user"
})
export class User extends Model {
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
    password!: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email!: string;

    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    createdAt!: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    updatedAt!: Date;

    @BelongsTo(() => Person)
    person!: Person

    @ForeignKey(() => Person)
    personId!: Person

    @BelongsTo(() => Role)
    role!: Role

    @ForeignKey(() => Role)
    roleId!: Role


    @BeforeCreate
    @BeforeUpdate
    static encryptPassword(user: User) {
        if (user.password) {
            const salt = bcrypt.genSaltSync(10, 'a');
            // Genero el hash del password.
            user.password = bcrypt.hashSync(user.password, salt);
        }
    }

    validPassword(password: string) {
        return bcrypt.compareSync(password, this.password);
    }

    static toDto(user: User): UserDto {
        return {
            id: user.id,
            name: user.name,
            password: user.password,
            email: user.email,
        } as UserDto
    }

}