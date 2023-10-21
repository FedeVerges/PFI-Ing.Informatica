import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  DefaultScope,
  HasMany,
  HasOne
} from 'sequelize-typescript';
import { Person } from './person';
import { StudentDto } from '../dto/studentDto';
import { Degree } from './degree';

@Table({
  timestamps: false,
  tableName: 'student'
})
export class Student extends Model {
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
  blockchainId!: string; // idBlockchain.

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  registrationNumber!: number; // id de registro a la carrera. Unico.

  @ForeignKey(() => Person)
  @Column({
    type: DataType.INTEGER
  })
  personId!: number;

  @BelongsTo(() => Person, 'personId')
  person!: Person;

  @BelongsTo(() => Degree, 'degreeId')
  degree!: Degree;

  @ForeignKey(() => Degree)
  @Column({
    type: DataType.INTEGER
  })
  degreeId!: number;

  static toDto(student: Student): StudentDto {
    return {
      id: student.id,
      universityName: student.degree.university,
      academicUnit: student.degree.academicUnit,
      degreeProgramCurriculum: student.degree.planId,
      degreeProgramName: student.degree.name,
      blockchainId: Number(student.blockchainId),
      registrationNumber: student.registrationNumber
    } as StudentDto;
  }

  static toDtoList(students: Student[]): StudentDto[] {
    return students.map((s) => this.toDto(s));
  }
}
