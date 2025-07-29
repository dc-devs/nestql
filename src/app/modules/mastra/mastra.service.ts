import { mastra } from '@src/mastra';
import type { Mastra } from '@mastra/core/mastra';
import {
	Logger,
	Injectable,
	type OnModuleInit,
	type OnModuleDestroy,
} from '@nestjs/common';

export interface ChatRequest {
	prompt: string;
	agentId?: string;
	conversationId?: string;
	userId?: string;
}

export interface ChatResponse {
	response: string;
	conversationId?: string;
	metadata?: Record<string, any>;
}

export interface ConversationRequest {
	messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
	agentId?: string;
	resourceId?: string;
	threadId?: string;
}

export interface ConversationResponse {
	text: string;
	metadata?: Record<string, any>;
}

@Injectable()
export class MastraService implements OnModuleInit, OnModuleDestroy {
	private readonly logger = new Logger(MastraService.name);
	private _mastra: Mastra;

	constructor() {
		// Use the existing Mastra instance from index.ts
		this._mastra = mastra;
	}

	async onModuleInit() {
		try {
			this.logger.log('MastraService initialized');
		} catch (error) {
			this.logger.error(
				'Failed to initialize Mastra service',
				error.stack,
			);

			throw error;
		}
	}

	async onModuleDestroy() {
		try {
			this.logger.log('Shutting down Mastra services...');
		} catch (error) {
			this.logger.error('Error during Mastra shutdown', error.stack);
		}
	}

	/**
	 * Get the Mastra instance
	 */
	get mastra(): Mastra {
		return this._mastra;
	}

	// /**
	//  * Execute a chat request with an agent
	//  */
	// async executeChat(request: ChatRequest): Promise<ChatResponse> {
	// 	try {
	// 		const agentId = request.agentId || 'chatAgent'; // Default to chatAgent
	// 		const agent = this.getAgent(agentId);

	// 		this.logger.debug(
	// 			`Executing chat with agent '${agentId}' for prompt: ${request.prompt}`,
	// 		);

	// 		const result = await agent.generate([
	// 			{
	// 				role: 'user',
	// 				content: request.prompt,
	// 			},
	// 		]);

	// 		return {
	// 			response: result.text,
	// 			conversationId: request.conversationId,
	// 			metadata: {
	// 				agentId,
	// 				userId: request.userId,
	// 				timestamp: new Date().toISOString(),
	// 			},
	// 		};
	// 	} catch (error) {
	// 		this.logger.error(
	// 			`Chat execution failed: ${error.message}`,
	// 			error.stack,
	// 		);
	// 		throw new InternalServerErrorException(
	// 			`Chat execution failed: ${error.message}`,
	// 		);
	// 	}
	// }
}
