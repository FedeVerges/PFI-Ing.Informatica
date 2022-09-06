import {
    Table,
    Model, ForeignKey
} from "sequelize-typescript";
import {Permission} from "./permission";
import {Role} from "./role";

@Table({
    timestamps: false,
    tableName: "permissionHasRole"
})
export class PermissionHasRole extends Model {
    @ForeignKey(() => Permission)
    permissionId!: number

    @ForeignKey(() => Role)
    roleId!: number
}