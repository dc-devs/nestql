import { Global, Module } from '@nestjs/common';
import { MastraService } from '@src/app/modules/mastra/mastra.service';
import { WorkflowStateService } from '@root/src/app/modules/mastra/workflow-state.service';

@Global()
@Module({
	providers: [MastraService, WorkflowStateService],
	exports: [MastraService, WorkflowStateService],
})
export class MastraModule {}
