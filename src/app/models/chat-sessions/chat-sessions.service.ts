import { Injectable } from '@nestjs/common';
import { select, modelName } from '@models/chat-sessions/common/constants';
import { PrismaService } from '@base/services/prisma/service/prisma.service';
import { BasePrismaService } from '@base/app/service/base-prisma-service';
import { ChatSession } from '@generated/chat-session/chat-session.model';
import { ChatSessionUpdateInput } from '@generated/chat-session/chat-session-update.input';
import { ChatSessionCreateInput } from '@generated/chat-session/chat-session-create.input';
import { FindManyChatSessionArgs } from '@generated/chat-session/find-many-chat-session.args';
import { DeleteOneChatSessionArgs } from '@generated/chat-session/delete-one-chat-session.args';
import { FindFirstChatSessionArgs } from '@generated/chat-session/find-first-chat-session.args';
import { CreateManyChatSessionArgs } from '@generated/chat-session/create-many-chat-session.args';
import { FindUniqueChatSessionArgs } from '@generated/chat-session/find-unique-chat-session.args';
import { UpdateManyChatSessionArgs } from '@generated/chat-session/update-many-chat-session.args';
import { ChatSessionWhereUniqueInput } from '@generated/chat-session/chat-session-where-unique.input';

@Injectable()
export class ChatSessionsService extends BasePrismaService<
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
> {
	constructor(protected prisma: PrismaService) {
		super({
			select,
			prisma,
			modelName,
		});
	}
}
