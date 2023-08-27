import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import db from './db/db';
import authRoutes from './routes/routes';
import { notificationService } from './services/notifications/notificationService';
import { web3Service } from './services/web3/web3Service';
import { initializer } from './db/initDB';
import bodyParser from 'body-parser';

export class App {
  private app: Application;
  // private notificationService!: NotificationService;

  constructor(private port?: number | string) {
    this.app = express();
    this.connectDb();
    this.settings();
    this.middlewares();
    this.initNotificationService();
    this.initBlockchainConnection();
  }

  settings() {
    this.app.set('port', this.port || 8080);
  }

  middlewares() {
    this.app.use(morgan('dev'));
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.setRoutes();
  }

  async connectDb() {
    try {
      if (process.env.INIT_DB === 'true') {
        await this.resetDataBase();
      } else {
        await db.sync();
      }
      // await db.sync({ alter: true });
      console.log('Base de datos conectada.');
    } catch (error: any) {
      throw new Error(error || 'Error al conectarse con la base de datos');
    }
  }

  initNotificationService() {
    try {
      notificationService.connect();
      console.log(
        'Servicio de notificaciones iniciado en el puerto',
        notificationService.port
      );
    } catch (error: any) {
      throw new Error(error || 'Error al iniciar WebSocket.');
    }
  }
  initBlockchainConnection() {
    try {
      web3Service.connectNetwork();
    } catch (e) {
      console.log('Error al conectar con blockchain', e);
    }
  }

  async listen() {
    this.app.listen(this.port);
    console.log(`Server on port ${this.port}`);
  }

  async setRoutes() {
    this.app.use([authRoutes]);
  }

  private async resetDataBase() {
    await db.sync({ force: true });
    await initializer.seedRoles();
    await initializer.seedStudents();
    await initializer.seedUsers();
  }
}
