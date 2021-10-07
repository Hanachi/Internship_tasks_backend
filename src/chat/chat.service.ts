import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Message from './message/message.entity';

@Injectable()
export class ChatService {
	constructor(
		@InjectRepository(Message)
		private messagesRepository: Repository<Message>,
	) {}

	async saveMessage(content) {
		const newMessage = await this.messagesRepository.create({
			content: content.message,
			time: content.time,
			author: content.author.id
		});
		await this.messagesRepository.save(newMessage);
		return {...newMessage, author: {id: content.author.id, username: content.author.username}};
	}

	async getAllMessages() {
		return this.messagesRepository.find({
			relations: ['author'],
			order: {
				id: "ASC"
			}
			
		});
	}
}