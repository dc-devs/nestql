import { PostgresStore } from '@mastra/pg';
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { chatAgent } from '@src/mastra/agents';
import { MastraInstance, SchemaName } from '@src/mastra/common/enums';

const schemaName =
	process.env.MASTRA_INSTANCE === MastraInstance.Server
		? SchemaName.MastraTemp
		: SchemaName.Mastra;

export const mastra: Mastra = new Mastra({
	workflows: {},
	agents: { chatAgent },
	storage: new PostgresStore({
		schemaName,
		connectionString: process.env.DATABASE_URL!,
	}),
	logger: new PinoLogger({
		name: 'Mastra',
		level: 'info',
	}),
	server: {
		port: 3004,
	},
});
