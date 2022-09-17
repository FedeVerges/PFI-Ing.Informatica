import {
    Table,
    Model, ForeignKey
} from "sequelize-typescript";
import {Permission} from "./permission";
import {Role} from "./role";

@Table({
    timestamps: false,
    tableName: "roleHasPermission"
})
export class RoleHasPermission extends Model {
    @ForeignKey(() => Permission)
    permissionId!: number

    @ForeignKey(() => Role)
    roleId!: number
}