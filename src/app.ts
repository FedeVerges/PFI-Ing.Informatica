import express, {Application} from "express";
import morgan from "morgan";
import cors from "cors";
import db from "./db/db";
import authRoutes from './routes/routes';
import certificateRoutes from './routes/routes';
import {web3Service} from "./services/web3/web3Service";
import {WebSocketServer} from "ws";
import {NotificationService} from "./services/notifications/notificationService";


export class App {
    private app: Application;
    private notificationService!: NotificationService;

    constructor(private port?: number | string) {
        this.app = express();
        this.connectDb();
        this.settings();
        this.middlewares();
        this.initNotificationService();
        // Iniciar servicio de web3.
    }

    settings() {
        this.app.set('port', this.port || 8080);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cors());
        this.setRoutes();
    }

    async connectDb() {
        try {
            await db.sync({force:true});
            // await db.sync();
            console.log("Base de datos conectada.");
        } catch (error: any) {
            throw new Error(error || 'Error al conectarse con la base de datos');
        }
    }

    initNotificationService() {
        try {
            this.notificationService = new NotificationService();
            console.log("Servicio de notificaciones iniciado en el puerto", this.notificationService.port);
        } catch (error: any) {
            throw new Error(error || 'Error al iniciar WebSocket.');
        }
    }

    async listen() {
        this.app.listen(this.port);
        console.log(`Server on port ${this.port}`);
    }

    async setRoutes() {
        this.app.use([authRoutes]);
    }

}