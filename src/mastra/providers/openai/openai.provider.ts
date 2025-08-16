import { createOpenAI } from '@ai-sdk/openai';

export const openaiProvider = createOpenAI({
	compatibility: 'strict',
	apiKey: (Bun.env.OPENAI_API_KEY ?? process.env.OPENAI_API_KEY)!,
});
