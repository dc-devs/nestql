import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ChatQueues } from '@routes/chat/jobs/common/enums';
import { AssistantGenerateProcessor } from '@routes/chat/jobs/queues/assistant/processors';
import { MastraModule } from '@src/app/modules/mastra/mastra.module';
import { MessagesModule } from '@models/messages/messages.module';

@Module({
	imports: [
		BullModule.registerQueue({ name: ChatQueues.Assistant }),
		MastraModule,
		MessagesModule,
	],
	providers: [AssistantGenerateProcessor],
	exports: [BullModule],
})
export class AssistantQueueModule {}
