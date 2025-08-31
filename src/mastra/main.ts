import { mastra } from '@root/src/mastra';

(async () => {
	const agent = await mastra.getAgent('chatAgent');

	const result = await agent.generate('What is the weather in London?');
	console.log(result.text);
	process.exit(0);
})();
