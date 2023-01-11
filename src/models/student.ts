import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
  DefaultScope
} from 'sequelize-typescript';
import { Certificate } from './certificate';
import { Person } from './person';
import { StudentDto } from '../dto/studentDto';
@DefaultScope(() => ({
  include: [Person]
}))
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
  registrationNumber!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  universityName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  academicUnit!: string; // Facultad

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  degreeProgramName!: string; // Nombre de la carrera

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  degreeProgramCurriculum!: string; // Plan de estudios

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  ministerialOrdinance!: string; // Ordenanza ministerial

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  superiorCouncilOrdinance!: string; // Ordenanza consejo superior.

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  directiveCouncilOrdinance!: string;

  // RELACIONES
  @HasMany(() => Certificate, 'studentId')
  certificates: Certificate[] | undefined;

  @ForeignKey(() => Person)
  @Column({
    type: DataType.INTEGER
  })
  personId!: number;

  @BelongsTo(() => Person, 'personId')
  person!: Person;

  static toDto(student: Student): StudentDto {
    return {
      id: student.id,
      universityName: student.universityName,
      academicUnit: student.academicUnit,
      degreeProgramCurriculum: student.degreeProgramCurriculum,
      degreeProgramName: student.degreeProgramName,
      superiorCouncilOrdinance: student.superiorCouncilOrdinance,
      directiveCouncilOrdinance: student.directiveCouncilOrdinance,
      ministerialOrdinance: student.ministerialOrdinance,
      person: Person.toDto(student.person),
      blockchainId: Number(student.blockchainId),
      registrationNumber: student.registrationNumber
    } as StudentDto;
  }

  static toDtoList(students: Student[]): StudentDto[] {
    return students.map((s) => this.toDto(s));
  }
}
