import {
	Injectable,
	OnModuleInit,
	OnModuleDestroy,
	Logger,
	BadRequestException,
	InternalServerErrorException,
} from '@nestjs/common';
import { mastra } from '@src/mastra';
import type { Mastra } from '@mastra/core/mastra';
import type { Agent } from '@mastra/core/agent';
import type { Workflow } from '@mastra/core/workflows';

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

export interface StreamingConversationRequest extends ConversationRequest {
	onComplete?: (fullResponse: string) => Promise<void>;
}

export interface WorkflowExecutionRequest {
	workflowId: string;
	inputData: Record<string, any>;
	userId?: string;
}

export interface WorkflowExecutionResponse {
	runId: string;
	status: 'success' | 'failed' | 'suspended';
	result?: any;
	error?: string;
	suspended?: string[][];
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
			this.logger.log('Mastra service initialization starting...');

			// The mastra instance is already configured with storage, agents, and workflows
			// Just log the successful initialization
			this.logger.log('Mastra service initialization complete');

			// Log available agents and workflows for debugging
			const agents = this._mastra.getAgents();
			const workflows = this._mastra.getWorkflows();

			this.logger.log(
				`Available agents: ${Object.keys(agents).join(', ') || 'none'}`,
			);
			this.logger.log(
				`Available workflows: ${
					Object.keys(workflows).join(', ') || 'none'
				}`,
			);
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
			// Add any cleanup logic here if Mastra provides shutdown methods
			// Note: As of current Mastra version, there might not be explicit shutdown methods
			this.logger.log('Mastra services shutdown complete');
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

	/**
	 * Get a specific agent by ID
	 */
	getAgent(agentId: string): Agent {
		const agent = this._mastra.getAgent(agentId);
		if (!agent) {
			throw new BadRequestException(`Agent '${agentId}' not found`);
		}
		return agent;
	}

	/**
	 * Get a specific workflow by ID
	 */
	getWorkflow(workflowId: string): Workflow<any, any, any> {
		try {
			const workflow = this._mastra.getWorkflow(workflowId);
			if (!workflow) {
				throw new BadRequestException(
					`Workflow '${workflowId}' not found`,
				);
			}
			return workflow;
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw error;
			}
			throw new InternalServerErrorException(
				`Failed to get workflow '${workflowId}': ${error.message}`,
			);
		}
	}

	/**
	 * Execute a chat request with an agent
	 */
	async executeChat(request: ChatRequest): Promise<ChatResponse> {
		try {
			const agentId = request.agentId || 'chatAgent'; // Default to chatAgent
			const agent = this.getAgent(agentId);

			this.logger.debug(
				`Executing chat with agent '${agentId}' for prompt: ${request.prompt}`,
			);

			const result = await agent.generate([
				{
					role: 'user',
					content: request.prompt,
				},
			]);

			return {
				response: result.text,
				conversationId: request.conversationId,
				metadata: {
					agentId,
					userId: request.userId,
					timestamp: new Date().toISOString(),
				},
			};
		} catch (error) {
			this.logger.error(
				`Chat execution failed: ${error.message}`,
				error.stack,
			);
			throw new InternalServerErrorException(
				`Chat execution failed: ${error.message}`,
			);
		}
	}

	/**
	 * Generate a response with conversation history and memory support
	 */
	async generateResponse(
		request: ConversationRequest,
	): Promise<ConversationResponse> {
		try {
			const agentId = request.agentId || 'chatAgent'; // Default to chatAgent
			const agent = this.getAgent(agentId);

			this.logger.debug(
				`Generating response with agent '${agentId}' for ${request.messages.length} messages`,
			);

			const options: any = {};

			// Add memory configuration if resourceId and threadId are provided
			if (request.resourceId && request.threadId) {
				options.memory = {
					resource: request.resourceId,
					thread: request.threadId,
				};
			}

			const result = await agent.generate(request.messages, options);

			return {
				text: result.text,
				metadata: {
					agentId,
					resourceId: request.resourceId,
					threadId: request.threadId,
					timestamp: new Date().toISOString(),
				},
			};
		} catch (error) {
			this.logger.error(
				`Response generation failed: ${error.message}`,
				error.stack,
			);
			throw new InternalServerErrorException(
				`Response generation failed: ${error.message}`,
			);
		}
	}

	/**
	 * Stream a response with conversation history and memory support
	 */
	async streamResponse(
		request: StreamingConversationRequest,
	): Promise<AsyncIterable<string>> {
		try {
			const agentId = request.agentId || 'chatAgent'; // Default to chatAgent
			const agent = this.getAgent(agentId);

			this.logger.debug(
				`Streaming response with agent '${agentId}' for ${request.messages.length} messages`,
			);

			const options: any = {};

			// Add memory configuration if resourceId and threadId are provided
			if (request.resourceId && request.threadId) {
				options.memory = {
					resource: request.resourceId,
					thread: request.threadId,
				};
			}

			// Add onFinish callback if onComplete is provided
			if (request.onComplete) {
				options.onFinish = ({ text }: { text: string }) => {
					request.onComplete!(text);
				};
			}

			const stream = await agent.stream(request.messages, options);

			return stream.textStream;
		} catch (error) {
			this.logger.error(
				`Response streaming failed: ${error.message}`,
				error.stack,
			);
			throw new InternalServerErrorException(
				`Response streaming failed: ${error.message}`,
			);
		}
	}

	/**
	 * Execute a workflow
	 */
	async executeWorkflow(
		request: WorkflowExecutionRequest,
	): Promise<WorkflowExecutionResponse> {
		try {
			const workflow = this.getWorkflow(request.workflowId);

			this.logger.debug(
				`Executing workflow '${request.workflowId}' with input:`,
				request.inputData,
			);

			const run = await workflow.createRunAsync();
			const result = await run.start({
				inputData: request.inputData,
			});

			this.logger.debug(
				`Workflow '${request.workflowId}' completed with status: ${result.status}`,
			);

			// Generate a simple runId since the actual runId might not be available in the result
			const runId = `workflow_${request.workflowId}_${Date.now()}`;

			return {
				runId,
				status: result.status as 'success' | 'failed' | 'suspended',
				result: result.status === 'success' ? result.result : undefined,
				error:
					result.status === 'failed'
						? String(result.error || 'Unknown error')
						: undefined,
				suspended:
					result.status === 'suspended'
						? result.suspended
						: undefined,
			};
		} catch (error) {
			this.logger.error(
				`Workflow execution failed: ${error.message}`,
				error.stack,
			);
			throw new InternalServerErrorException(
				`Workflow execution failed: ${error.message}`,
			);
		}
	}

	/**
	 * Resume a suspended workflow
	 */
	async resumeWorkflow(
		workflowId: string,
		runId: string,
		stepId: string | string[],
		resumeData: any,
		userId?: string,
	): Promise<WorkflowExecutionResponse> {
		try {
			const workflow = this.getWorkflow(workflowId);

			this.logger.debug(
				`Resuming workflow '${workflowId}' run '${runId}' from step '${stepId}'`,
			);

			// Create a run instance with the existing runId
			const run = await workflow.createRunAsync({ runId });

			const result = await run.resume({
				step: stepId,
				resumeData,
			});

			this.logger.debug(
				`Workflow '${workflowId}' resumed with status: ${result.status}`,
			);

			return {
				runId, // Use the provided runId
				status: result.status as 'success' | 'failed' | 'suspended',
				result: result.status === 'success' ? result.result : undefined,
				error:
					result.status === 'failed'
						? String(result.error || 'Unknown error')
						: undefined,
				suspended:
					result.status === 'suspended'
						? result.suspended
						: undefined,
			};
		} catch (error) {
			this.logger.error(
				`Workflow resume failed: ${error.message}`,
				error.stack,
			);
			throw new InternalServerErrorException(
				`Workflow resume failed: ${error.message}`,
			);
		}
	}

	/**
	 * Get list of available agents
	 */
	getAvailableAgents(): string[] {
		const agents = this._mastra.getAgents();
		return Object.keys(agents || {});
	}

	/**
	 * Get list of available workflows
	 */
	getAvailableWorkflows(): string[] {
		const workflows = this._mastra.getWorkflows();
		return Object.keys(workflows || {});
	}
}
