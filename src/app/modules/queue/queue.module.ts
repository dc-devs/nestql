import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

@Global()
@Module({
	imports: [
		BullModule.forRoot({
			connection: {
				url: Bun.env.REDIS_URL!,
			},
		}),
	],
	exports: [BullModule],
})
export class QueueModule {}
