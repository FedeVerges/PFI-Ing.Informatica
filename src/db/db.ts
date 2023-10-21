import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user';
import { Student } from '../models/student';
import { Person } from '../models/person';
import { BlockchainTransaction } from '../models/blockchainTransaction';
import { Role } from '../models/role';
import { Permission } from '../models/permission';
import { RoleHasPermission } from '../models/roleHasPermission';
import { Degree } from '../models/degree';

const DATABASE_URL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

/* const db = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  models: [
    Certificate,
    User,
    Student,
    CertificateType,
    Institution,
    Person,
    BlockchainTransaction,
    Role,
    Permission,
    RoleHasPermission
  ]
});
 */
const db = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  models: [
    User,
    Student,
    Person,
    BlockchainTransaction,
    Role,
    Permission,
    RoleHasPermission,
    Degree
  ]
});
export default db;
