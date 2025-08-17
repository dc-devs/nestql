import { Injectable, type OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	private readonly logger = new Logger(PrismaService.name);

	constructor() {
		super({
			log: [
				{ level: 'error', emit: 'stdout' },
				{ level: 'warn', emit: 'stdout' },
			],
			omit: {
				user: {
					password: true,
				},
			},
		});
	}

	async onModuleInit() {
		try {
			await this.$connect();
			this.logger.log('Database connection established');
		} catch (err) {
			this.logger.error('Failed to connect to database', {
				error: (err as any)?.message,
				code: (err as any)?.code,
			});
			throw err;
		}
	}

	async onModuleDestroy() {
		await this.$disconnect();
		this.logger.log('Database connection closed');
	}
}
