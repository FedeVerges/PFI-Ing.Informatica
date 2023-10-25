import {
  Table,
  Model,
  Column,
  DataType,
  DefaultScope,
  BelongsToMany,
  HasMany,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { Person } from './person';
import { Student } from './student';

@Table({
  timestamps: false,
  tableName: 'degree'
})
export class Degree extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    defaultValue: 20
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  academicUnit!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  type!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  planId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  university!: string;

  @HasMany(() => Student)
  student!: Student;
  // @BelongsToMany(() => Person, () => Student)
  // Persons!: Array<Person & { RoleHasPermission: Student }>;
}
