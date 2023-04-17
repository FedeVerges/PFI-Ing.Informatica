import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  ForeignKey,
  Scopes,
  DefaultScope
} from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import { UserDto } from 'dto/userDto';
import { Person } from './person';
import { Role } from './role';
@DefaultScope(() => ({
  include: [Person, Role]
}))
@Scopes(() => ({
  full: {
    include: [Person, Role]
  }
}))
@Table({
  timestamps: false,
  tableName: 'user'
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
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
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email!: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  roleId!: number;

  @ForeignKey(() => Person)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  personId!: number;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  updatedAt!: Date;

  @BelongsTo(() => Person, 'personId')
  person!: Person;

  @BelongsTo(() => Role, 'roleId')
  role!: Role;

  @BeforeCreate
  @BeforeUpdate
  static encryptPassword(user: User) {
    if (user.password) {
      const salt = bcrypt.genSaltSync(10, 'a');
      // Genero el hash del password.
      user.password = bcrypt.hashSync(user.password, salt);
    }
  }

  validPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  static toDto(user: User): UserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      person: Person.toDtoWithStudents(user.person)
    } as UserDto;
  }
}
