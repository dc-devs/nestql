import { type LanguageModelV1 } from '@ai-sdk/provider';
import { openaiProvider } from '@src/mastra/providers/openai/openai.provider';

export enum OpenAIModel {
	OpenAIGpt41 = 'gpt-4.1',
	OpenAIGpt41Mini = 'gpt-4.1-mini',
	OpenAIGptO4Mini = 'o4-mini',
	OpenAIGptO3 = 'o3',
	OpenAIGptO3Mini = 'o3-mini',
}

// Flagship GPT model for complex tasks
// -------------------------------------------
export const openAIGpt41: LanguageModelV1 = openaiProvider(
	OpenAIModel.OpenAIGpt41,
);

export const openAIGpt41Mini: LanguageModelV1 = openaiProvider(
	OpenAIModel.OpenAIGpt41Mini,
);

// Faster, more affordable reasoning model
// -------------------------------------------
export const openAIGptO4Mini: LanguageModelV1 = openaiProvider(
	OpenAIModel.OpenAIGptO4Mini,
);

// Most powerful reasoning model
// -------------------------------------------
export const openAIGptO3: LanguageModelV1 = openaiProvider(
	OpenAIModel.OpenAIGptO3,
);

export const openAIGptO3Mini: LanguageModelV1 = openaiProvider(
	OpenAIModel.OpenAIGptO3Mini,
);
