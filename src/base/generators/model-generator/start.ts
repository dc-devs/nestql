import { modelGenerator } from '@base/generators/model-generator/model-generator';

(async () => {
	await modelGenerator();
	process.exit(0);
})();
