import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { chatAgent } from '@src/mastra/agents';

export const mastra: Mastra = new Mastra({
	workflows: {},
	agents: { chatAgent },
	storage: new LibSQLStore({
		// stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
		url: ':memory:',
	}),
	logger: new PinoLogger({
		name: 'Mastra',
		level: 'debug',
	}),
	server: {
		port: 3004,
	},
});
