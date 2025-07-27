import { Injectable, Logger } from '@nestjs/common';
import { MastraService } from '@src/app/modules/mastra/mastra.service';

export interface SuspendedWorkflowContext {
	workflowId: string;
	runId: string;
	stepId: string | string[];
	userId?: string;
	suspendedAt: Date;
	suspendPayload?: any;
	metadata?: Record<string, any>;
	expiresAt?: Date;
}

export interface WorkflowResumptionRequest {
	workflowId: string;
	runId: string;
	stepId: string | string[];
	resumeData: any;
	userId?: string;
}

@Injectable()
export class WorkflowStateService {
	private readonly logger = new Logger(WorkflowStateService.name);

	// In-memory storage for suspended workflows
	// In production, you might want to persist this to a database
	private suspendedWorkflows = new Map<string, SuspendedWorkflowContext>();

	constructor(private readonly mastraService: MastraService) {}

	/**
	 * Track a suspended workflow
	 */
	trackSuspendedWorkflow(context: SuspendedWorkflowContext): void {
		const key = this.generateWorkflowKey(context.workflowId, context.runId);

		this.suspendedWorkflows.set(key, {
			...context,
			suspendedAt: new Date(),
		});

		this.logger.debug(`Tracked suspended workflow: ${key}`);
	}

	/**
	 * Get a suspended workflow context
	 */
	getSuspendedWorkflowContext(
		workflowId: string,
		runId: string,
	): SuspendedWorkflowContext | undefined {
		const key = this.generateWorkflowKey(workflowId, runId);
		return this.suspendedWorkflows.get(key);
	}

	/**
	 * Resume a workflow from Slack user response or other external input
	 */
	async resumeWorkflowFromExternalInput(
		workflowId: string,
		runId: string,
		stepId: string | string[],
		userResponse: any,
		userId?: string,
	): Promise<any> {
		const context = this.getSuspendedWorkflowContext(workflowId, runId);

		if (!context) {
			throw new Error(
				`No suspended workflow found for ID: ${workflowId}:${runId}`,
			);
		}

		this.logger.log(
			`Resuming workflow ${context.workflowId} for run ${runId} from step ${stepId}`,
		);

		try {
			const result = await this.mastraService.resumeWorkflow(
				workflowId,
				runId,
				stepId,
				userResponse,
				userId,
			);

			// If workflow completed or failed, remove from tracking
			if (result.status === 'success' || result.status === 'failed') {
				this.removeSuspendedWorkflow(workflowId, runId);
				this.logger.log(
					`Workflow ${workflowId} run ${runId} completed with status: ${result.status}`,
				);
			}

			return result;
		} catch (error) {
			this.logger.error(
				`Failed to resume workflow ${workflowId} run ${runId}: ${error.message}`,
				error.stack,
			);
			throw error;
		}
	}

	/**
	 * Get all suspended workflows for a specific user
	 */
	getSuspendedWorkflowsForUser(userId: string): SuspendedWorkflowContext[] {
		return Array.from(this.suspendedWorkflows.values()).filter(
			(context) => context.userId === userId,
		);
	}

	/**
	 * Get all suspended workflows
	 */
	getAllSuspendedWorkflows(): SuspendedWorkflowContext[] {
		return Array.from(this.suspendedWorkflows.values());
	}

	/**
	 * Remove a suspended workflow from tracking
	 */
	removeSuspendedWorkflow(workflowId: string, runId: string): boolean {
		const key = this.generateWorkflowKey(workflowId, runId);
		const removed = this.suspendedWorkflows.delete(key);

		if (removed) {
			this.logger.debug(`Removed suspended workflow: ${key}`);
		}

		return removed;
	}

	/**
	 * Clean up old suspended workflows (for maintenance)
	 */
	cleanupOldSuspendedWorkflows(olderThanHours: number = 24): void {
		const cutoffTime = new Date(
			Date.now() - olderThanHours * 60 * 60 * 1000,
		);

		for (const [runId, context] of this.suspendedWorkflows.entries()) {
			const shouldCleanup =
				context.suspendedAt < cutoffTime ||
				(context.expiresAt && context.expiresAt < new Date());

			if (shouldCleanup) {
				this.suspendedWorkflows.delete(runId);
				this.logger.log(`Cleaned up old suspended workflow: ${runId}`);
			}
		}
	}

	/**
	 * Check if a workflow run is currently suspended
	 */
	isWorkflowSuspended(workflowId: string, runId: string): boolean {
		const key = this.generateWorkflowKey(workflowId, runId);
		return this.suspendedWorkflows.has(key);
	}

	/**
	 * Get suspended workflows by workflow ID
	 */
	getSuspendedWorkflowsByWorkflowId(
		workflowId: string,
	): SuspendedWorkflowContext[] {
		return Array.from(this.suspendedWorkflows.values()).filter(
			(context) => context.workflowId === workflowId,
		);
	}

	/**
	 * Update suspended workflow metadata
	 */
	updateSuspendedWorkflowMetadata(
		workflowId: string,
		runId: string,
		metadata: Record<string, any>,
	): boolean {
		const key = this.generateWorkflowKey(workflowId, runId);
		const context = this.suspendedWorkflows.get(key);

		if (context) {
			context.metadata = { ...context.metadata, ...metadata };
			this.suspendedWorkflows.set(key, context);
			return true;
		}

		return false;
	}

	/**
	 * Set expiration for a suspended workflow
	 */
	setSuspendedWorkflowExpiration(
		workflowId: string,
		runId: string,
		expiresAt: Date,
	): boolean {
		const key = this.generateWorkflowKey(workflowId, runId);
		const context = this.suspendedWorkflows.get(key);

		if (context) {
			context.expiresAt = expiresAt;
			this.suspendedWorkflows.set(key, context);
			return true;
		}

		return false;
	}

	/**
	 * Get statistics about suspended workflows
	 */
	getSuspendedWorkflowStats(): {
		total: number;
		byWorkflow: Record<string, number>;
		byUser: Record<string, number>;
		expired: number;
	} {
		const contexts = this.getAllSuspendedWorkflows();
		const now = new Date();

		const stats = {
			total: contexts.length,
			byWorkflow: {} as Record<string, number>,
			byUser: {} as Record<string, number>,
			expired: 0,
		};

		for (const context of contexts) {
			// Count by workflow
			stats.byWorkflow[context.workflowId] =
				(stats.byWorkflow[context.workflowId] || 0) + 1;

			// Count by user
			if (context.userId) {
				stats.byUser[context.userId] =
					(stats.byUser[context.userId] || 0) + 1;
			}

			// Count expired
			if (context.expiresAt && context.expiresAt < now) {
				stats.expired++;
			}
		}

		return stats;
	}

	/**
	 * Generate a unique key for workflow tracking
	 */
	private generateWorkflowKey(workflowId: string, runId: string): string {
		return `${workflowId}:${runId}`;
	}
}
