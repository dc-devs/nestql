import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ChatQueues } from '@routes/chat/jobs/common/enums';
import { MessagesModule } from '@models/messages/messages.module';
import { MastraModule } from '@src/app/modules/mastra/mastra.module';
import { AssistantGenerateProcessor } from '@routes/chat/jobs/queues/assistant/processors';
import { ChatSessionsModule } from '@models/chat-sessions/chat-sessions.module';

@Module({
	imports: [
		MastraModule,
		MessagesModule,
		ChatSessionsModule,
		BullModule.registerQueue({ name: ChatQueues.Assistant }),
	],
	providers: [AssistantGenerateProcessor],
	exports: [BullModule],
})
export class AssistantQueueModule {}
