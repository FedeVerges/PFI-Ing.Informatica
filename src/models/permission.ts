import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany
} from "sequelize-typescript";
import { RoleHasPermission } from "./permissionHasRole";
import { Role } from "./role";
@Table({
    timestamps: false,
    tableName: "permission"
})
export class Permission extends Model {
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

    @BelongsToMany(() => Role, () => RoleHasPermission)
    Roles!: Role[]
}