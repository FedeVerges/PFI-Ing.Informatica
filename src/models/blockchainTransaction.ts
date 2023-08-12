import { strict } from 'assert';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // import locale
import { BlockchainTransactionDto } from 'dto/blockchainTransactionDto';
import { TRANSACTION_STATUS } from 'enum/transactionStatus';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  DefaultScope,
  Scopes
} from 'sequelize-typescript';
import { Certificate } from './certificate';
import { Person } from './person';
import { Student } from './student';
import { CertificateEth } from './blockchain/certificateEth';
dayjs.locale('es');

@Table({
  timestamps: false,
  tableName: 'transaction'
})
export class BlockchainTransaction extends Model {
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
  methodName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  transactionHash!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  studentName!: string;

  // @ForeignKey(() => Certificate)
  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: true
  // })
  // ceritificateId?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  ceritificateBlockchainId?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  status!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  blockNumber?: number;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  blockHash?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  from?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  gasUsed?: number;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  dateCreated!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  dateModified?: Date;

  // @BelongsTo(() => Certificate, 'ceritificateId')
  // certificate!: Certificate;

  static toDtoList(
    transactions: BlockchainTransaction[]
  ): BlockchainTransactionDto[] {
    return transactions.map((t) => {
      return BlockchainTransaction.toDto(t);
    });
  }

  static toDto(
    t?: BlockchainTransaction,
    certificateData?: CertificateEth
  ): BlockchainTransactionDto {
    let cert: CertificateEth | null = null;
    if (certificateData) {
      cert = {
        id: certificateData.id,
        student: {
          id: certificateData.student.id,
          name: certificateData.student.name,
          lastname: certificateData.student.lastname,
          docNumber: certificateData.student.docNumber,
          sex: certificateData.student.sex,
          registrationNumber: certificateData.student.registrationNumber
        },
        universityDegree: {
          universityName: certificateData.universityDegree.universityName,
          academicUnit: certificateData.universityDegree.academicUnit,
          degreeProgramName: certificateData.universityDegree.degreeProgramName,
          degreeProgramCurriculum:
            certificateData.universityDegree.degreeProgramCurriculum,
          degreeType: certificateData.universityDegree.degreeType,
          superiorCouncilOrdinance:
            certificateData.universityDegree.superiorCouncilOrdinance,
          directiveCouncilOrdinance:
            certificateData.universityDegree.directiveCouncilOrdinance,
          ministerialOrdinance:
            certificateData.universityDegree.ministerialOrdinance
        },
        waferNumber: certificateData.waferNumber,
        createdAt: certificateData.createdAt,
        updatedAt: certificateData.updatedAt,
        createdAtDesc: dayjs(certificateData.createdAt * 1000).format(
          'DD/MM/YYYY HH:mm'
        ),
        updatedAtDesc: dayjs(certificateData.updatedAt * 1000).format(
          'DD/MM/YYYY HH:mm'
        ),
        active: certificateData.active
      };
    }
    return {
      transactionHash: t?.transactionHash || '',
      certificate: cert || null,
      studentName: t?.studentName || '',
      methodName: t?.methodName || '',
      certificateBlockchainId: t?.ceritificateBlockchainId || '',
      status: t?.status || '',
      blockHash: t?.blockHash || '',
      etherscanLink: this.createEtherscanLink(t?.transactionHash || ''),
      gasUsed: t?.gasUsed || '',
      dateCreated: t?.dateCreated
        ? dayjs(t?.dateCreated).format('DD/MM/YYYY HH:mm')
        : '',
      dateModified: t?.dateModified
        ? dayjs(t?.dateModified).format('DD/MM/YYYY HH:mm')
        : ''
    } as BlockchainTransactionDto;
  }

  private static createEtherscanLink(transactionHash: string): string {
    /**
     * Poner la dir de etherscan en una config por las dudas.
     */
    let ret = 'https://sepolia.etherscan.io/tx/';
    if (transactionHash && transactionHash.length > 0) {
      ret += transactionHash;
    }
    return ret;
  }
  // static toDto(certificate: Certificate): CertificateDto {
  //     return {
  //         id: certificate.id,
  //         student: Student.toDto(certificate.student),
  //         degreeType: certificate.degreeType,
  //         degreeName: certificate.degreeName,
  //         ministerialOrdinance: certificate.ministerialOrdinance,
  //         waferNumber: certificate.waferNumber,
  //         volumeNumber: certificate.volumeNumber,
  //         recordNumber: certificate.recordNumber,
  //         createdAt: certificate.createdAt,
  //         updatedAt: certificate.updatedAt,
  //         status: certificate.status,
  //     } as CertificateDto
  // }
}
