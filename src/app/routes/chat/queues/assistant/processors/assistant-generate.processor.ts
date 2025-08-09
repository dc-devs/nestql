import { Job /*, Queue */ } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { /* InjectQueue, */ Processor, WorkerHost } from '@nestjs/bullmq';
import { MessagesService } from '@models/messages/messages.service';
import { MastraService } from '@src/app/modules/mastra/mastra.service';
import { MessageType, MessageSender } from '@models/messages/common/enums';
import { ChatJobs, ChatQueues } from '@routes/chat/queues/common/enums';

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
		// @InjectQueue(ChatJobs.AssistantGenerate)
		// private readonly assistantQueue: Queue,
	) {
		super();
	}

	/**
	 * Handle incoming jobs from the `chat.assistant` queue.
	 *
	 * Steps:
	 * 1) Guard by job name to ensure we only process `chat.assistant.generate` tasks.
	 * 2) Extract payload (session id, prompt).
	 * 3) Generate an LLM response via Mastra `chatAgent`.
	 * 4) Persist the assistant message associated to the chat session.
	 * 5) Log completion for observability.
	 */
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

		// 3) Generate LLM response
		const agent = await this.mastraService.mastra.getAgent('chatAgent');
		const response = await agent.generate([
			{
				role: MessageSender.User,
				content: prompt,
			},
		]);

		// 4) Persist assistant message
		await this.messagesService.create({
			sender: MessageSender.Assistant,
			type: MessageType.Text,
			content: response.text,
			chatSession: {
				connect: { id: chatSessionId },
			},
		});

		// 5) Log completion
		this.logger.verbose(
			`Assistant message saved for chatSessionId=${chatSessionId} jobId=${job.id}`,
		);
	}
}
