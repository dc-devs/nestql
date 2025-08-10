import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateChatInput } from '@routes/chat/dto/inputs';
import { UserSafe } from '@models/users/common/entities/user-safe';
import { ChatQueues, ChatJobs } from '@routes/chat/jobs/common/enums';
import { ChatAssistantGenerationStatus } from '@routes/chat/dto/models';
import { ChatSession } from '@generated/chat-session/chat-session.model';
import { Message } from '@generated/message/message.model';
import { MessageType, MessageSender } from '@models/messages/common/enums';
import { ChatSessionsService } from '@models/chat-sessions/chat-sessions.service';
import { MessagesService } from '@models/messages/messages.service';

@Injectable()
export class ChatService {
	private readonly logger = new Logger(ChatService.name);

	constructor(
		private readonly chatSessionsService: ChatSessionsService,
		private readonly messageSessionsService: MessagesService,
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
		 * Enqueue assistant-generation job (per-message deterministic jobId)
		 */
		const jobName = ChatJobs.AssistantGenerate;
		const lastUserMessageId = chatSession.messages?.at(-1)?.id!;
		const jobData = {
			chatSessionId: chatSession.id,
			lastUserMessageId,
			prompt: message,
		};
		const jobOptions = {
			// keep completed job for 5 minutes before removal
			removeOnComplete: { age: 60 * 5 },
			removeOnFail: false,
			jobId: `${ChatQueues.Assistant}:${chatSession.id}.${lastUserMessageId}`,
		};
		await this.assistantQueue.add(jobName, jobData, jobOptions);

		return chatSession;
	}

	async updateChat({
		input,
		chatSessionId,
		user,
	}: {
		chatSessionId: number;
		input: CreateChatInput;
		user: UserSafe;
	}): Promise<Message> {
		const { message } = input;

		// Verify the chat session exists and belongs to the user
		const chatSession = await this.chatSessionsService.findFirst({
			where: {
				id: { equals: chatSessionId },
				userId: { equals: user.id },
			},
		});

		if (!chatSession) {
			throw new NotFoundException(
				`Chat session ${chatSessionId} not found or access denied`,
			);
		}

		// Add new message to the chat session
		const newMessage = await this.messageSessionsService.create({
			sender: MessageSender.User,
			type: MessageType.Text,
			content: message,
			chatSession: {
				connect: { id: chatSessionId },
			},
		});

		/**
		 * Enqueue assistant-generation job (per-message deterministic jobId)
		 */
		const jobName = ChatJobs.AssistantGenerate;
		const lastUserMessageId = newMessage?.id!;
		const jobData = {
			chatSessionId: chatSessionId,
			lastUserMessageId,
			prompt: message,
		};
		const jobOptions = {
			// keep completed job for 5 minutes before removal
			removeOnComplete: { age: 60 * 5 },
			removeOnFail: false,
			jobId: `${ChatQueues.Assistant}:${chatSessionId}.${lastUserMessageId}`,
		};
		await this.assistantQueue.add(jobName, jobData, jobOptions);

		return newMessage;
	}

	async getChatAssistantGenerationStatusByMessage({
		chatSessionId,
		lastUserMessageId,
		user,
	}: {
		chatSessionId: number;
		lastUserMessageId: number;
		user: UserSafe;
	}): Promise<ChatAssistantGenerationStatus> {
		// Verify the chat session exists and belongs to the user
		const chatSession = await this.chatSessionsService.findFirst({
			where: {
				id: { equals: chatSessionId },
				userId: { equals: user.id },
			},
		});

		if (!chatSession) {
			throw new NotFoundException(
				`Chat session ${chatSessionId} not found or access denied`,
			);
		}

		/**
		 * Determine status for a specific user message's assistant-generation job.
		 * Uses deterministic jobId per message: `${ChatQueues.Assistant}:${chatSessionId}.${lastUserMessageId}`.
		 */
		const jobId = `${ChatQueues.Assistant}:${chatSessionId}.${lastUserMessageId}`;
		const job = await this.assistantQueue.getJob(jobId);
		if (!job)
			return {
				status: null,
				lastUserMessageId,
			};

		const state = await job.getState();

		return {
			status: state,
			lastUserMessageId: job.data?.lastUserMessageId ?? lastUserMessageId,
		};
	}
}
