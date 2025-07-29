import { Global, Module } from '@nestjs/common';
import { MastraService } from '@src/app/modules/mastra/mastra.service';

@Global()
@Module({
	providers: [MastraService],
	exports: [MastraService],
})
export class MastraModule {}
