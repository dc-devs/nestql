import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const weatherInfoTool = createTool({
	id: 'Get Weather Information',
	inputSchema: z.object({
		city: z.string(),
	}),
	outputSchema: z.object({
		temperature: z.number(),
		conditions: z.string(),
	}),
	description: `Fetches the current weather information for a given city`,
	execute: async ({ context }) => {
		return { temperature: 20, conditions: 'Sunny' };
	},
});
