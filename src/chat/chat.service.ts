import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';

import { AuthenticationService } from './authentication.service';
import Message from './message/message.entity';
import { UserEntity } from '../user/models/user.entity';

@Injectable()
export class ChatService {
	constructor(
		// private readonly authenticationService: AuthenticationService,
		@InjectRepository(Message)
		private messagesRepository: Repository<Message>,
	) {}

	// async getUserFromSocket(socket: Socket) {
	// 	const handshake = socket.handshake.headers;
	// 	const userProfile = JSON.parse(localStorage.getItem('profile'))
	// 	const user = await this.authenticationService.getUserFromAuthenticationToken(userProfile);
	// 	if (!user) {
	// 		throw new WsException('Invalid credentials.');
	// 	}
	// 	return user;
	// }

	async saveMessage(content) {
		const newMessage = await this.messagesRepository.create({
			content: content.message,
			time: content.time,
			author: content.author.id
		});
		await this.messagesRepository.save(newMessage);
		return {...newMessage, author: content.author.username};
	}

	async getAllMessages() {
		return this.messagesRepository.find({
			relations: ['author']
		});
	}
}