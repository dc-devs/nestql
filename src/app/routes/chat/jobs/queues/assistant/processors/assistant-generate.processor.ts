import { Job } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { MessagesService } from '@models/messages/messages.service';
import { ChatSessionsService } from '@models/chat-sessions/chat-sessions.service';
import { MastraService } from '@src/app/modules/mastra/mastra.service';
import { MessageType, MessageSender } from '@models/messages/common/enums';
import { ChatJobs, ChatQueues } from '@routes/chat/jobs/common/enums';

interface GenerateAssistantJobData {
	chatSessionId: number;
	lastUserMessageId?: number;
	prompt: string;
}

/**
 * Processor for assistant-related chat jobs.
 *
 * - Binds to the `chat.assistant` queue.
 * - Executes only jobs named `chat.assistant.generate`.
 */
@Processor(ChatQueues.Assistant)
@Injectable()
export class AssistantGenerateProcessor extends WorkerHost {
	private readonly logger = new Logger(AssistantGenerateProcessor.name);

	constructor(
		private readonly mastraService: MastraService,
		private readonly messagesService: MessagesService,
		private readonly chatSessionsService: ChatSessionsService,
	) {
		super();
	}

	async process(
		job: Job<GenerateAssistantJobData, any, string>,
	): Promise<void> {
		// 1) Guard by job name (only handle the expected action)
		if (job.name !== ChatJobs.AssistantGenerate) return;

		// 2) Extract payload
		const { chatSessionId, prompt } = job.data;
		this.logger.verbose(
			`Generating assistant message for chatSessionId=${chatSessionId} jobId=${job.id}`,
		);

		try {
			// 3) Get chat session info for resourceId (userId)
			const chatSession = await this.chatSessionsService.findOne({
				where: { id: chatSessionId },
			});

			if (!chatSession) {
				throw new Error(`Chat session ${chatSessionId} not found`);
			}

			// 4) Generate LLM response with proper thread context
			const agent = await this.mastraService.mastra.getAgent('chatAgent');
			const response = await agent.generate(
				[
					{
						role: MessageSender.User,
						content: prompt,
					},
				],
				{
					threadId: `chat-session-${chatSessionId}`, // Use chat session as thread ID
					resourceId: `user-${chatSession.userId}`, // Use user ID as resource ID
				},
			);

			// 5) Persist assistant message
			await this.messagesService.create({
				sender: MessageSender.Assistant,
				type: MessageType.Text,
				content: response.text,
				chatSession: {
					connect: { id: chatSessionId },
				},
			});

			// 6) Log completion
			this.logger.verbose(
				`Assistant message saved for chatSessionId=${chatSessionId} jobId=${job.id}`,
			);
		} catch (error) {
			this.logger.error(
				`Failed to generate assistant message for chatSessionId=${chatSessionId} jobId=${job.id}`,
				error.stack,
			);
			throw error; // Re-throw to mark job as failed
		}
	}
}
