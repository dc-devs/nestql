import { UseGuards } from '@nestjs/common';
import { ChatService } from '@routes/chat/chat.service';
import { Chat } from '@routes/chat/dto/models';
import { NewChatInput } from '@routes/chat/dto/inputs';
import { IsAuthenticated } from '@routes/auth/guards';
import { Mutation, Resolver, Args, Context } from '@nestjs/graphql';
import type { IAuthenticatedRequest } from '@routes/auth/common/interfaces/authenticated-request.interface';

@Resolver()
@UseGuards(IsAuthenticated)
export class ChatResolver {
	constructor(private readonly chatService: ChatService) {}

	@Mutation(() => Chat)
	async newChatMessage(
		@Context('req') request: IAuthenticatedRequest,
		@Args('input') input: NewChatInput,
	): Promise<Chat> {
		return await this.chatService.createChatWithMessage(
			input,
			request.user!,
		);
	}
}
