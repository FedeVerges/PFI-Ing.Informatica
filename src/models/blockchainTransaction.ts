import { strict } from 'assert';
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

@DefaultScope(() => ({
  include: [Certificate]
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
  transactionHash!: string;

  @ForeignKey(() => Certificate)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  ceritificateId: number | undefined;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  ceritificateBlockchainId: number | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  status!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  blockNumber: number | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  blockHash: number | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  from: string | undefined;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  gasUsed: number | undefined;

  @BelongsTo(() => Certificate, 'ceritificateId')
  certificate!: Certificate;

  static toDtoList(
    transactions: BlockchainTransaction[]
  ): BlockchainTransactionDto[] {
    return transactions.map((t) => {
      return {
        transactionHash: t.transactionHash,
        certificate: Certificate.toDto(t.certificate),
        certificateBlockchainId: t.ceritificateBlockchainId,
        status: t.status,
        blockHash: t.blockHash,
        etherscanLink: this.createEtherscanLink(t.transactionHash),
        gasUsed: t.gasUsed
      } as BlockchainTransactionDto;
    });
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
