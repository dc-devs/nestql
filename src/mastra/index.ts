import { PostgresStore } from '@mastra/pg';
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { chatAgent } from '@src/mastra/agents';

export const mastra: Mastra = new Mastra({
	workflows: {},
	agents: { chatAgent },
	storage: new PostgresStore({
		connectionString: (Bun.env.MASTRA_DATABASE_URL ??
			process.env.MASTRA_DATABASE_URL)!,
	}),
	logger: new PinoLogger({
		name: 'Mastra',
		level: 'info',
	}),
	server: {
		port: 3004,
	},
});
