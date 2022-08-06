import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import db from "./db/db";
import authRoutes from './routes/auth';
import certificateRoutes from './routes/auth';
import { web3Service } from "./services/web3/web3Service";


export class App {
    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.connectDb();
        this.settings();
        this.middlewares();
        this.setRoutes();
        // Iniciar servicio de web3.
    }
    settings() {
        this.app.set('port', this.port || 8080);
    }

    middlewares() {
        const corsOptions = {
        };
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cors());
        console.log(web3Service)
        web3Service.connect();
        // Agregar conexion con la bd.
    }

    async connectDb() {
        try {
            // await db.sync({force:true});
            await db.sync();
            console.log("Base de datos conectada.");
        } catch (error: any) {
            throw new Error(error || 'Error al conectarse con la base de datos');
        }
    }

    async listen() {
        this.app.listen(this.port);
        console.log(`Server on port ${this.port}`);
    }

    async setRoutes() {
        this.app.use([authRoutes,certificateRoutes]);
        
    }

}