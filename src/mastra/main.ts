import { mastra } from '@root/src/mastra';

const agent = await mastra.getAgent('chatAgent');

const result = await agent.generate('What is the weather in London?');
console.log(result.text);
