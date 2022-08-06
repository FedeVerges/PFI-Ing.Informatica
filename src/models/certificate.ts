import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { CertificateType } from './certificateType';
import { Institution } from './institute';
import { Student } from './student';

@Table({
    timestamps: false,
    tableName: "certificate"
})
export class Certificate extends Model {
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
    name!: string;

    @ForeignKey(() => Institution)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    institutionId!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    degreeName!: string;

    @ForeignKey(() => CertificateType)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    certificateTypeId!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    dateCreated!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    dateModified!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    waferNumber!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    volumeNumber!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    recordNumber!: string;

    @ForeignKey(() => Student)
    @Column({
        type: DataType.INTEGER,
    })
    studentId!: number;

    @BelongsTo(() => Student)
    student: Student | undefined;
}