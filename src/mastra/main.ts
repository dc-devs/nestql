import { mastra } from '@root/src/mastra';

const agent = await mastra.getAgent('chatAgent');

// console.log(agent);
// console.log(agent.getTools());

const result = await agent.generate('What is the weather in London?');

// for (const prop in result) {
// 	console.log(prop, result[prop]);
// }
