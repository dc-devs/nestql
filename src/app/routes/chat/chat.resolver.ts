import { UseGuards } from '@nestjs/common';
import { ChatService } from '@routes/chat/chat.service';
import { CreateChatInput } from '@routes/chat/dto/inputs';
import { IsAuthenticated } from '@routes/auth/guards';
import { Mutation, Resolver, Args, Context, Query, Int } from '@nestjs/graphql';
import { ChatSession } from '@generated/chat-session/chat-session.model';
import { Message } from '@generated/message/message.model';
import type { IAuthenticatedRequest } from '@routes/auth/common/interfaces/authenticated-request.interface';
import { ChatAssistantGenerationStatus } from '@routes/chat/dto/models';

@Resolver(() => ChatSession)
@UseGuards(IsAuthenticated)
export class ChatResolver {
	constructor(private readonly chatService: ChatService) {}

	@Mutation(() => ChatSession)
	async createChat(
		@Context('req') request: IAuthenticatedRequest,
		@Args('input') input: CreateChatInput,
	): Promise<ChatSession> {
		return await this.chatService.createChat({
			input,
			user: request.user!,
		});
	}

	@Mutation(() => Message)
	async updateChat(
		@Context('req') request: IAuthenticatedRequest,
		@Args('chatSessionId', { type: () => Int })
		chatSessionId: number,
		@Args('input') input: CreateChatInput,
	): Promise<Message> {
		return await this.chatService.updateChat({
			input,
			chatSessionId,
			user: request.user!,
		});
	}

	@Query(() => ChatAssistantGenerationStatus, {
		nullable: true,
		description:
			'Get assistant generation job status for a specific user message',
	})
	async chatAssistantGenerationStatusByMessage(
		@Context('req') request: IAuthenticatedRequest,
		@Args('chatSessionId', { type: () => Int })
		chatSessionId: number,
		@Args('lastUserMessageId', { type: () => Int })
		lastUserMessageId: number,
	): Promise<ChatAssistantGenerationStatus | null> {
		const result =
			await this.chatService.getChatAssistantGenerationStatusByMessage({
				chatSessionId,
				lastUserMessageId,
				user: request.user!,
			});
		return result;
	}
}
