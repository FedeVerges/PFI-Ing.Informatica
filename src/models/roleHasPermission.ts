import {
    Table,
    Model, ForeignKey, Column, DataType
} from "sequelize-typescript";
import {Permission} from "./permission";
import {Role} from "./role";

@Table({
    timestamps: false,
    tableName: "roleHasPermission"
})
export class RoleHasPermission extends Model {

    @ForeignKey(() => Permission)
    @Column({ type: DataType.INTEGER})
    permissionId!: number;

    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER})
    roleId!: number;
}