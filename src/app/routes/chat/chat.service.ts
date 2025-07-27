import { Injectable, Logger } from '@nestjs/common';
import { MessagesService } from '@models/messages/messages.service';
import { ChatSessionsService } from '@models/chat-sessions/chat-sessions.service';

@Injectable()
export class ChatService {
	private readonly logger = new Logger(ChatService.name);

	constructor(
		private readonly messagesService: MessagesService,
		private readonly chatSessionsService: ChatSessionsService,
	) {}
}
