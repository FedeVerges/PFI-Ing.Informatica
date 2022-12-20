import { Certificate } from '../models/certificate';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user';
import { Student } from '../models/student';
import { CertificateType } from '../models/certificateType';
import { Institution } from '../models/institute';
import { Person } from '../models/person';
import { BlockchainTransaction } from '../models/blockchainTransaction';
import { Role } from '../models/role';
import { Permission } from '../models/permission';
import { RoleHasPermission } from '../models/roleHasPermission';

const DATABASE_URL = 'localhost://postgres:5433/SVT_20220706';

const user = 'postgres';
const host = 'localhost';
const database = 'SVT_20220706';
const password = '41221778';
const port = 5433;

const db = new Sequelize(database, user, password, {
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
export default db;
