import { Chat } from '@routes/chat/dto/models';
import { NewChatInput } from '@routes/chat/dto/inputs';
import { UserSafe } from '@models/users/common/entities/user-safe';
import { MessagesService } from '@models/messages/messages.service';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ChatSessionsService } from '@models/chat-sessions/chat-sessions.service';

@Injectable()
export class ChatService {
	private readonly logger = new Logger(ChatService.name);

	constructor(
		private readonly messagesService: MessagesService,
		private readonly chatSessionsService: ChatSessionsService,
	) {}

	async createChatWithMessage(
		input: NewChatInput,
		user: UserSafe,
	): Promise<Chat> {
		const { message } = input;
		const chatSession = await this.chatSessionsService.create(
			{
				title: new Date().toISOString(),
				user: {
					connect: { id: user.id },
				},
			},
			{ include: { messages: true } },
		);

		// Create the new message
		const newMessage = await this.messagesService.create({
			sender: 'user',
			type: 'text',
			content: message,
			chatSession: {
				connect: { id: chatSession.id },
			},
		});

		return {
			chatSession,
			messages: [newMessage],
		};
	}
}
