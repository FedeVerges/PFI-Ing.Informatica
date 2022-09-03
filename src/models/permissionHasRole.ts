import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, ForeignKey
} from "sequelize-typescript";
import {Permission} from "./permission";
import {Role} from "./role";

@Table({
    timestamps: false,
    tableName: "role"
})
export class PermissionHasRole extends Model {
    @ForeignKey(() => Permission)
    @Column
    permissionId!: number

    @ForeignKey(() => Role)
    @Column
    roleId!: number
}