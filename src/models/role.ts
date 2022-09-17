import {
    Table,
    Model,
    Column,
    DataType,
    HasMany,
    BelongsToMany
} from "sequelize-typescript";
import { Permission } from "./permission";
import { RoleHasPermission } from "./permissionHasRole";
import { User } from "./user";

@Table({
    timestamps: false,
    tableName: "role"
})
export class Role extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
    })
    description!: string;

    @BelongsToMany(() => Permission, () => RoleHasPermission)
    permissions: Permission[] | undefined

    @HasMany(() => User)
    user: User[] | undefined
}