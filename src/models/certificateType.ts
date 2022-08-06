import { Table, Model,Column,DataType } from 'sequelize-typescript'

@Table({
    timestamps:false,
    tableName:"certificate_types"
})
export class CertificateType extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    })
    id!:number;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!:string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description!:string;
}