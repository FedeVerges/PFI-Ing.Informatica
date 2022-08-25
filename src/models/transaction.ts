import { Table, Model, Column, DataType } from 'sequelize-typescript'

@Table({
    timestamps: false,
    tableName: "transaction"
})
export class BlockchainTransaction extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    transactionHash!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    ceritificateId: number | undefined;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    ceritificateBlockchainId: number | undefined;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    status!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    blockNumber: number | undefined;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    blockHash: number | undefined;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    from: string | undefined;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    gasUsed: number | undefined;

}