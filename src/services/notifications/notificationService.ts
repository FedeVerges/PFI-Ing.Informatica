import { web3Service } from '../../services/web3/web3Service';
import * as WebSocket from 'ws';
import { WebSocketServer } from 'ws';
import { NotificationDto } from '../../dto/notificationDto';
import { NOTIFICATION_TYPES } from 'enum/notificationTypes';

class NotificationService {
  private static instance: NotificationService;

  public static get Instance(): NotificationService {
    return (
      NotificationService.instance ||
      (NotificationService.instance = new this())
    );
  }

  get port(): number {
    return this._port;
  }
  get webSocketInstance(): WebSocket.WebSocketServer {
    return this._webSocketInstance;
  }

  private _webSocketInstance: WebSocketServer;
  private _port = 9090;

  constructor() {
    // initialize the WebSocket server instance
    this._webSocketInstance = new WebSocket.Server({ port: this._port });
  }

  connect() {
    this.webSocketInstance.on('connection', (ws: WebSocket) => {
      ws.on('message', (messageAsString: string) => {
        if (!this.webSocketInstance.clients.has(ws)) {
          console.log('conectado');
        }
      });
      ws.on('error', (err) => {
        console.log(err.stack);
      });
      web3Service.getNetworkStatus();
    });
  }

  sendNotification(clientId: number, message: NotificationDto) {
    this.webSocketInstance.clients.forEach((c) =>
      c.send(JSON.stringify(message))
    );
  }
}

export const notificationService = NotificationService.Instance;
