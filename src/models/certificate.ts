import { CertificateDto } from 'dto/certificateDto';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { CertificateType } from './certificateType';
import { Institution } from './institute';
import { Student } from './student';

@Table({
  timestamps: false,
  tableName: 'certificate'
})
export class Certificate extends Model {
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
  degreeType!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  degreeName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  waferNumber!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  dateCreated!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  dateModified!: string;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.INTEGER
  })
  studentId!: number;

  @BelongsTo(() => Student, 'studentId')
  student!: Student;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  status!: string; // 'ACT', 'BAJ', 'PEN' => Pendiente de transaccion.

  static toDtoList(certificates: Certificate[]): CertificateDto[] {
    return certificates.map((c) => {
      return {
        id: c.id,
        student: Student.toDto(c.student),
        degreeType: c.degreeType,
        degreeName: c.degreeName,
        ministerialOrdinance: c.student.ministerialOrdinance,
        waferNumber: c.waferNumber,
        dateCreated: c.dateCreated,
        dateModified: c.dateModified,
        status: c.status
      } as CertificateDto;
    });
  }
  static toDto(certificate: Certificate): CertificateDto {
    return {
      id: certificate.id,
      student: Student.toDto(certificate.student),
      degreeType: certificate.degreeType,
      degreeName: certificate.degreeName,
      ministerialOrdinance: certificate.student.ministerialOrdinance,
      waferNumber: certificate.waferNumber,
      dateCreated: certificate.dateCreated,
      dateModified: certificate.dateModified,
      status: certificate.status
    } as CertificateDto;
  }
}
