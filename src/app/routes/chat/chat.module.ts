import { Module } from '@nestjs/common';
import { ChatService } from '@routes/chat/chat.service';
import { AuthModule } from '@routes/auth/auth.module';
import { ChatResolver } from '@routes/chat/chat.resolver';
import { MessagesService } from '@models/messages/messages.service';
import { MastraModule } from '@src/app/modules/mastra/mastra.module';
import { PrismaService } from '@base/services/prisma/service/prisma.service';
import { ChatSessionsService } from '@models/chat-sessions/chat-sessions.service';

@Module({
	imports: [MastraModule, AuthModule],
	providers: [
		ChatService,
		ChatResolver,
		PrismaService,
		MessagesService,
		ChatSessionsService,
	],
	exports: [ChatService],
})
export class ChatModule {}
