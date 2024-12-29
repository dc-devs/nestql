import { updateAppFiles } from '@base/generators/model-generator/update-app-files';
import { generateSeedFiles } from '@base/generators/model-generator/generate-seed-files';
import { generateModelFiles } from '@base/generators/model-generator/generate-model-files';
import {
	handleNoModelNameError,
	handleNoPrismaSchemaError,
} from '@base/generators/model-generator/common/handle-errors';
import {
	getCommandLineArgs,
	getParsedPrismaSchema,
} from '@base/generators/common/utils';

export const modelGenerator = async () => {
	const commandLineArgs = getCommandLineArgs();
	const modelName = commandLineArgs.model;

	if (!modelName) {
		handleNoModelNameError();
	}

	const parsedPrismaSchema = await getParsedPrismaSchema({ modelName });

	if (!parsedPrismaSchema) {
		handleNoPrismaSchemaError({ modelName });
	}

	await generateModelFiles({ modelName });
	await generateSeedFiles({ modelName });
	await updateAppFiles({ modelName });
	console.log('Model generated successfully 🎉');

	process.exit(0);
};
