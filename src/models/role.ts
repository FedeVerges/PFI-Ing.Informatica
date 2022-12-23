import { RoleDto } from 'dto/roleDto';
import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  BelongsToMany
} from 'sequelize-typescript';
import { Permission } from './permission';
import { RoleHasPermission } from './roleHasPermission';
import { User } from './user';

@Table({
  timestamps: false,
  tableName: 'role'
})
export class Role extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  })
  id!: number;

  @Column({
    type: DataType.STRING
  })
  name!: string;

  @Column({
    type: DataType.STRING
  })
  description!: string;

  @BelongsToMany(() => Permission, () => RoleHasPermission)
  permissions?: Array<Permission & {RoleHasPermission: RoleHasPermission}>;

  @HasMany(() => User, 'roleId')
  user?: User[];

  static toDto(role: Role): RoleDto {
    return {
      id: role.id,
      name: role.name,
      description: role.description
    };
  }
}
