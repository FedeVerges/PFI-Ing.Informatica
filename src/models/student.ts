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
import { BlockchainTransaction } from './blockchainTransaction';

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
    type: DataType.STRING
  })
  blockchainId?: string; // idBlockchain.

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
  /* 
  @HasMany(() => BlockchainTransaction)
  certificates: BlockchainTransaction[] | undefined; */

  toDto(st: Student, p: Person, d: Degree): StudentDto {
    return {
      id: st.id,
      universityName: d.university,
      academicUnit: d.academicUnit,
      degreeProgramCurriculum: d.planId,
      degreeProgramName: d.name,
      blockchainId: st.blockchainId ? Number(st.blockchainId) : null,
      degreeType: d.type,
      registrationNumber: st.registrationNumber,
      person: p ? Person.toDto(p) : null
    } as StudentDto;
  }

  static toDto(student: Student): StudentDto {
    return {
      id: student.id,
      universityName: student.degree.university,
      academicUnit: student.degree.academicUnit,
      degreeProgramCurriculum: student.degree.planId,
      degreeProgramName: student.degree.name,
      blockchainId: student.blockchainId ? Number(student.blockchainId) : null,
      degreeType: student.degree.type,
      registrationNumber: student.registrationNumber,
      person: student.person ? Person.toDto(student.person) : null
    } as StudentDto;
  }

  static toDtoList(students: Student[]): StudentDto[] {
    return students.map((s) => this.toDto(s));
  }
}
