import { Module } from '@nestjs/common';
import { ChatSessionsService } from '@models/chat-sessions/chat-sessions.service';
import { ChatSessionsResolver } from '@models/chat-sessions/chat-sessions.resolver';
import { PrismaService } from '@base/services/prisma/service/prisma.service';

@Module({
	providers: [ChatSessionsResolver, ChatSessionsService, PrismaService],
	exports: [ChatSessionsService],
})
export class ChatSessionsModule {}
