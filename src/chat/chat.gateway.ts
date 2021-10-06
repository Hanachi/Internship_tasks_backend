import {
	ConnectedSocket,
	MessageBody, OnGatewayConnection,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection {
	@WebSocketServer()
	server: Server;

	constructor(
		private readonly chatService: ChatService
	) {
	}

	async handleConnection(socket: Socket) {

	}
	
	@SubscribeMessage('send_message')
	async listenForMessages(
		@MessageBody() content: string,
		@ConnectedSocket() socket: Socket,
		) {
			const message = await this.chatService.saveMessage(content);
			this.server.sockets.emit('receive_message', message);
		}

	@SubscribeMessage('request_all_messages')
	async requestAllMessages(
		@ConnectedSocket() socket: Socket,
	) {
		
		const messages = await this.chatService.getAllMessages();
		
		socket.emit('send_all_messages', messages);
	}
}