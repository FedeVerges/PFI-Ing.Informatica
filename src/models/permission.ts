import { PermissionDto } from "dto/permissionDto";
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

    static toDtoList(permissions: Permission[]): PermissionDto {
        let dto: PermissionDto = {};
        permissions.forEach(p => {
            switch (p.name) {
                case 'CREATE_CERTIFICATE':
                    dto.canCreateCertificate = true;
                    break;
                case 'DELETE_CERTIFICATE':
                    dto.canDeleteCertificates = true;
                    break;
                case 'READ_CERTIFICATE':
                    dto.canViewCertificates = true;
                    break;
                case 'VALIDATE_CERTIFICATE':
                    dto.canValidateCertificates = true;
                    break;
                case 'CREATE_USER':
                    dto.canCreateUser = true;
                    break;
            }
        })
        return dto;
    }
}