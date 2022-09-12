import { web3Service } from '../../services/web3/web3Service';
import * as WebSocket from 'ws';
import { Server, WebSocketServer } from "ws";

class NotificationService {
    get port(): number {
        return this._port;
    }
    get webSocketInstance(): WebSocket.WebSocketServer {
        return this._webSocketInstance;
    }

    set webSocketInstance(value: WebSocket.WebSocketServer) {
        this._webSocketInstance = value;
    }

    private _webSocketInstance: WebSocketServer;
    private _port = 9090;
    private clientsActive: Map<number, WebSocket>;

    constructor() {
        // initialize the WebSocket server instance
        this._webSocketInstance = new WebSocket.Server({ port: this._port });
        this.clientsActive = new Map<number, WebSocket>();
    }

    connect() {
        this.webSocketInstance.on('connection', (ws: WebSocket) => {
            console.log('conectado');
            ws.on('message', (messageAsString: string) => {
                try {
                    // Obtener informacion del cliente.
                    const message = JSON.parse(messageAsString);
                    const clientId = message.id;
                    if (this.webSocketInstance.clients.has(ws)) {
                        this.clientsActive.set(clientId, ws);
                    }
                } catch (e) {
                    console.log('Ocurrió un error al parsear el mensaje')
                }
            });
            ws.send(JSON.stringify(web3Service.getNetworkStatus()));
        });
    }

    sendNotification(clientId: number, message: any) {
        this.webSocketInstance.clients.forEach((c) => {
            c.send(JSON.stringify(message))
        })
    }
}


export const notificationService = new NotificationService();