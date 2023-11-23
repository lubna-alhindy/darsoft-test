import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { News } from './entities/news.entity';

@WebSocketGateway()
export class NewsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(client.id, 'connected');
  }

  handleDisconnect(client: Socket) {
    console.log(client.id, 'disconnected');
  }

  lastNewsChange(news: News, status: string) {
    this.server.emit('last-news-change', { status, news });
  }
}
