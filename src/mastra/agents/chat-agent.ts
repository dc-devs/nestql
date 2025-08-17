// import { Memory } from '@mastra/memory';
import { Agent } from '@mastra/core/agent';
import { weatherInfoTool } from '@root/src/mastra/tools/weather-info.tool';
import { openAIGpt41Mini } from '@src/mastra/providers/openai/openai.models';

export const chatAgent = new Agent({
	name: 'Chat Agent',
	model: openAIGpt41Mini,
	instructions: 'You are a helpful assistant.',
	tools: { weatherInfoTool },
	// memory: new Memory({}),
});
