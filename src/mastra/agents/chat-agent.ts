import { Memory } from '@mastra/memory';
import { Agent } from '@mastra/core/agent';
import { LibSQLStore } from '@mastra/libsql';
import { weatherInfoTool } from '@root/src/mastra/tools/weather-info.tool';
import { openAIGpt41Mini } from '@src/mastra/providers/openai/openai.models';

export const chatAgent = new Agent({
	name: 'Chat Agent',
	model: openAIGpt41Mini,
	instructions: 'You are a helpful assistant.',
	tools: { weatherInfoTool },
	memory: new Memory({
		storage: new LibSQLStore({
			url: 'file:../mastra.db', // path is relative to the .mastra/output directory
		}),
	}),
});
