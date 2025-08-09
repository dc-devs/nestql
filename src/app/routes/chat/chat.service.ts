import { Injectable, Logger } from '@nestjs/common';
import { CreateChatInput } from '@routes/chat/dto/inputs';
import { UserSafe } from '@models/users/common/entities/user-safe';
import { ChatSessionsService } from '@models/chat-sessions/chat-sessions.service';
import { ChatSession } from '@generated/chat-session/chat-session.model';
import { MessageType, MessageSender } from '@models/messages/common/enums';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { connectedRedisClient } from '@base/session-store/initialize-redis';
import { ChatAssistantGenerationStatus } from '@routes/chat/dto/models';
import { ChatQueues, ChatJobs } from '@routes/chat/queues/common/enums';

@Injectable()
export class ChatService {
	private readonly logger = new Logger(ChatService.name);

	constructor(
		private readonly chatSessionsService: ChatSessionsService,
		@InjectQueue(ChatQueues.Assistant)
		private readonly assistantQueue: Queue,
	) {}

	async createChat({
		input,
		user,
	}: {
		input: CreateChatInput;
		user: UserSafe;
	}): Promise<ChatSession> {
		const { message } = input;

		// Create new chat session with the first message in a single operation
		const chatSession = await this.chatSessionsService.create(
			{
				title: new Date().toISOString(),
				user: {
					connect: { id: user.id },
				},
				messages: {
					create: [
						{
							sender: MessageSender.User,
							type: MessageType.Text,
							content: message,
						},
					],
				},
			},
			{ include: { messages: true } },
		);

		/**
		 * Enqueue assistant-generation job
		 *
		 * - Queue: `ChatQueues.Assistant`
		 * - Job name: `ChatJobs.AssistantGenerate`
		 * - Job data:
		 *   - `chatSessionId`: links the job to this session so the processor can write back
		 *   - `lastUserMessageId`: the latest user message id so the client can scope updates
		 *   - `prompt`: the raw user message for the agent
		 * - Retention:
		 *   - Keep completed jobs for ~5 minutes (`removeOnComplete.age`) so the frontend
		 *     can poll a recently-completed status before the job is cleaned up
		 */
		const job = await this.assistantQueue.add(
			ChatJobs.AssistantGenerate,
			{
				chatSessionId: chatSession.id,
				lastUserMessageId: chatSession.messages?.at(-1)?.id,
				prompt: message,
			},
			{
				// keep completed job for 5 minutes before removal
				removeOnComplete: { age: 60 * 5 },
				removeOnFail: false,
			},
		);

		/**
		 * Persist a mapping `chatSessionId -> jobId` in Redis for O(1) lookups
		 * during status polling. TTL is set to 24h so short-term queries do not
		 * need to scan queue sets.
		 */
		try {
			await connectedRedisClient?.set(
				`chat:assistantJob:${chatSession.id}`,
				String(job.id),
				{ EX: 60 * 60 * 24 },
			);
		} catch (error) {
			this.logger.warn(
				`Failed to store assistant job mapping in Redis for chatSessionId=${chatSession.id}: ${error?.message}`,
			);
		}

		return chatSession;
	}

	async getChatAssistantGenerationStatus({
		chatSessionId,
	}: {
		chatSessionId: number;
	}): Promise<ChatAssistantGenerationStatus> {
		/**
		 * Determine the assistant-generation job status for a given `chatSessionId`.
		 *
		 * Strategy:
		 * 1) Fast path via Redis mapping (O(1)):
		 *    - Read `jobId` saved at enqueue time: `chat:assistantJob:<chatSessionId>`.
		 *    - If present, fetch the job and return its BullMQ state plus the `lastUserMessageId`
		 *      stored in `job.data` (so the client can scope UI updates to the latest user message).
		 *
		 * 2) Fallback scan (best-effort):
		 *    - If the mapping is missing or the job aged out (completed jobs are kept ~5 minutes),
		 *      scan common BullMQ sets (active, waiting, delayed, failed, completed) and match by
		 *      `job.data.chatSessionId`.
		 *    - When found, return the status. We cannot reliably recover `lastUserMessageId` here,
		 *      so it is returned as `null`.
		 *
		 * 3) If not found in any set, return `{ status: null }` to signal unknown/expired status.
		 *
		 * Notes:
		 * - The enqueue path retains completed jobs for 5 minutes (see `removeOnComplete`). After that,
		 *   only the fallback may succeed. If you must keep `lastUserMessageId` beyond that window,
		 *   persist a separate mapping (e.g., Redis with longer TTL or a table) at enqueue time.
		 */
		// Prefer checking by jobId stored in Redis
		try {
			const jobId = await connectedRedisClient?.get(
				`chat:assistantJob:${chatSessionId}`,
			);

			if (jobId) {
				const job = await this.assistantQueue.getJob(jobId);
				if (!job) return { status: null, lastUserMessageId: null };
				const state = await job.getState();

				return {
					status: state,
					lastUserMessageId: job.data?.lastUserMessageId ?? null,
				};
			}
		} catch (error) {
			this.logger.warn(
				`Failed to read assistant job mapping for chatSessionId=${chatSessionId}: ${error?.message}`,
			);
		}

		// Fallback: scan typical sets to infer status by chatSessionId
		const [active, waiting, delayed, failed, completed] = await Promise.all(
			[
				this.assistantQueue.getActive(),
				this.assistantQueue.getWaiting(),
				this.assistantQueue.getDelayed(),
				this.assistantQueue.getFailed(),
				this.assistantQueue.getCompleted(),
			],
		);

		const matchesSession = (j: any) =>
			j?.name === ChatJobs.AssistantGenerate &&
			j?.data?.chatSessionId === chatSessionId;

		if (active.find(matchesSession))
			return { status: 'active', lastUserMessageId: null };
		if (waiting.find(matchesSession))
			return { status: 'waiting', lastUserMessageId: null };
		if (delayed.find(matchesSession))
			return { status: 'delayed', lastUserMessageId: null };
		if (failed.find(matchesSession))
			return { status: 'failed', lastUserMessageId: null };
		if (completed.find(matchesSession))
			return { status: 'completed', lastUserMessageId: null };

		return { status: null, lastUserMessageId: null };
	}

	// async updateChat({
	// 	input,
	// 	user,
	// }: {
	// 	input: ChatInput;
	// 	user: UserSafe;
	// }): Promise<Chat> {
	// 	const { message } = input;

	// 	// Create new chat session
	// 	const chatSession = await this.chatSessionsService.create(
	// 		{
	// 			title: new Date().toISOString(),
	// 			user: {
	// 				connect: { id: user.id },
	// 			},
	// 		},
	// 		{ include: { messages: true } },
	// 	);

	// 	// Create the new message
	// 	const newMessage = await this.messagesService.create({
	// 		sender: 'user',
	// 		type: 'text',
	// 		content: message,
	// 		chatSession: {
	// 			connect: { id: chatSession.id },
	// 		},
	// 	});

	// 	// Get LLM response
	// 	const chatAgent = await this.mastraService.mastra.getAgent('chatAgent');

	// 	const response = await chatAgent.generate([
	// 		{
	// 			role: 'user',
	// 			content: message,
	// 		},
	// 	]);
	// 	const assistantMessage = await this.messagesService.create({
	// 		sender: 'user',
	// 		type: 'text',
	// 		content: response.text,
	// 		chatSession: {
	// 			connect: { id: chatSession.id },
	// 		},
	// 	});

	// 	return {
	// 		chatSession,
	// 		messages: [newMessage, assistantMessage],
	// 	};
	// }
}
