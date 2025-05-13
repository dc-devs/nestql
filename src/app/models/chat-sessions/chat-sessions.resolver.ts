import { Resolver } from '@nestjs/graphql';
import { BasePrismaResolver } from '@base/app/resolver/base-prisma-resolver';
import { ChatSessionsService } from '@models/chat-sessions/chat-sessions.service';
import { ChatSession } from '@generated/chat-session/chat-session.model';
import { ChatSessionUpdateInput } from '@generated/chat-session/chat-session-update.input';
import { ChatSessionCreateInput } from '@generated/chat-session/chat-session-create.input';
import { FindManyChatSessionArgs } from '@generated/chat-session/find-many-chat-session.args';
import { FindFirstChatSessionArgs } from '@generated/chat-session/find-first-chat-session.args';
import { DeleteOneChatSessionArgs } from '@generated/chat-session/delete-one-chat-session.args';
import { FindUniqueChatSessionArgs } from '@generated/chat-session/find-unique-chat-session.args';
import { CreateManyChatSessionArgs } from '@generated/chat-session/create-many-chat-session.args';
import { UpdateManyChatSessionArgs } from '@generated/chat-session/update-many-chat-session.args';
import { ChatSessionWhereUniqueInput } from '@generated/chat-session/chat-session-where-unique.input';

@Resolver(() => ChatSession)
export class ChatSessionsResolver extends BasePrismaResolver<
	ChatSession,
	ChatSessionWhereUniqueInput,
	FindUniqueChatSessionArgs,
	FindFirstChatSessionArgs,
	FindManyChatSessionArgs,
	ChatSessionCreateInput,
	CreateManyChatSessionArgs,
	ChatSessionUpdateInput,
	UpdateManyChatSessionArgs,
	DeleteOneChatSessionArgs
>({
	entity: ChatSession,
	whereUniqueInput: ChatSessionWhereUniqueInput,
	findUniqueArgs: FindUniqueChatSessionArgs,
	findFirstArgs: FindFirstChatSessionArgs,
	findManyArgs: FindManyChatSessionArgs,
	createOneInput: ChatSessionCreateInput,
	createManyArgs: CreateManyChatSessionArgs,
	updateOneInput: ChatSessionUpdateInput,
	updateManyArgs: UpdateManyChatSessionArgs,
	deleteOneArgs: DeleteOneChatSessionArgs,
}) {
	constructor(protected readonly service: ChatSessionsService) {
		super({ baseService: service });
	}
}
