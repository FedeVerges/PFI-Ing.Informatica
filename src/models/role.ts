import {
    Table,
    Model,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    HasOne,
    HasMany,
    BelongsToMany
} from "sequelize-typescript";
import {Permission} from "./permission";
import {PermissionHasRole} from "./permissionHasRole";

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

    @BelongsToMany(() => Permission, () => PermissionHasRole )
    permissions!: Permission[]


}