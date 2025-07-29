import { Chat } from '@routes/chat/dto/models';
import { Injectable, Logger } from '@nestjs/common';
import { NewChatInput } from '@routes/chat/dto/inputs';
import { UserSafe } from '@models/users/common/entities/user-safe';
import { MessagesService } from '@models/messages/messages.service';
import { MastraService } from '@src/app/modules/mastra/mastra.service';
import { ChatSessionsService } from '@models/chat-sessions/chat-sessions.service';

@Injectable()
export class ChatService {
	private readonly logger = new Logger(ChatService.name);

	constructor(
		private readonly mastraService: MastraService,
		private readonly messagesService: MessagesService,
		private readonly chatSessionsService: ChatSessionsService,
	) {}

	async createChatWithMessage(
		input: NewChatInput,
		user: UserSafe,
	): Promise<Chat> {
		const { message } = input;

		// Create new chat session
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

		// Get LLM response
		const chatAgent = await this.mastraService.mastra.getAgent('chatAgent');

		const response = await chatAgent.generate([
			{
				role: 'user',
				content: message,
			},
		]);
		const assistantMessage = await this.messagesService.create({
			sender: 'user',
			type: 'text',
			content: response.text,
			chatSession: {
				connect: { id: chatSession.id },
			},
		});

		return {
			chatSession,
			messages: [newMessage, assistantMessage],
		};
	}
}
