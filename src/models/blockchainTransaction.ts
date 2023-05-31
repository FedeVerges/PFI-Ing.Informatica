import { strict } from 'assert';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // import locale
import { BlockchainTransactionDto } from 'dto/blockchainTransactionDto';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  DefaultScope
} from 'sequelize-typescript';
import { Certificate } from './certificate';
import { Person } from './person';
import { Student } from './student';
dayjs.locale('es');

@DefaultScope(() => ({
  include: [
    {
      model: Certificate,
      required: true,
      include: [
        {
          model: Student,
          required: true,
          include: [
            {
              model: Person,
              required: true
            }
          ]
        }
      ]
    }
  ]
}))
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

  @ForeignKey(() => Certificate)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  ceritificateId?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  ceritificateBlockchainId?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  status: string = 'pending';

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

  @BelongsTo(() => Certificate, 'ceritificateId')
  certificate!: Certificate;

  static toDtoList(
    transactions: BlockchainTransaction[]
  ): BlockchainTransactionDto[] {
    return transactions.map((t) => {
      return BlockchainTransaction.toDto(t);
    });
  }

  static toDto(t: BlockchainTransaction): BlockchainTransactionDto {
    return {
      transactionHash: t.transactionHash,
      certificate: t.certificate ? Certificate.toDto(t.certificate) : null,
      certificateBlockchainId: t.ceritificateBlockchainId,
      status: t.status,
      blockHash: t.blockHash,
      etherscanLink: this.createEtherscanLink(t.transactionHash),
      gasUsed: t.gasUsed,
      dateCreated: t.dateCreated
        ? dayjs(t.dateCreated).format('DD/MM/YYYY')
        : '',
      dateModified: t.dateModified
        ? dayjs(t.dateModified).format('DD/MM/YYYY')
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
