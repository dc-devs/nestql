import { Module } from '@nestjs/common';
import { ChatService } from '@routes/chat/chat.service';
import { AuthModule } from '@routes/auth/auth.module';
import { ChatResolver } from '@routes/chat/chat.resolver';
import { MessagesModule } from '@models/messages/messages.module';
import { QueueModule } from '@src/app/modules/queue/queue.module';
import { MastraModule } from '@src/app/modules/mastra/mastra.module';
import { PrismaService } from '@base/services/prisma/service/prisma.service';
import { ChatSessionsModule } from '@models/chat-sessions/chat-sessions.module';
import { AssistantQueueModule } from '@routes/chat/jobs/queues/assistant/assistant-queue.module';

@Module({
	imports: [
		AuthModule,
		QueueModule,
		MastraModule,
		MessagesModule,
		ChatSessionsModule,
		AssistantQueueModule,
	],
	providers: [PrismaService, ChatService, ChatResolver],
	exports: [ChatService],
})
export class ChatModule {}
