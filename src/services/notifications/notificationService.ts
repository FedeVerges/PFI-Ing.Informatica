import { web3Service } from '../../services/web3/web3Service';
import * as WebSocket from 'ws';
import { WebSocketServer } from 'ws';
import { NotificationDto } from '../../dto/notificationDto';

class NotificationService {
  private _webSocketInstance: WebSocketServer;
  private _port = 9090;

  get webSocketInstance(): WebSocket.WebSocketServer {
    return this._webSocketInstance;
  }

  get port(): number {
    return this._port;
  }

  // Instancia única del servicio.
  private static instance: NotificationService;

  // Método que retorna la instancia.
  public static get Instance(): NotificationService {
    return (
      NotificationService.instance ||
      (NotificationService.instance = new NotificationService())
    );
  }

  constructor() {
    // Inicializa el servidor Websocket.
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

// Retorna la instancia.
export const notificationService = NotificationService.Instance;
