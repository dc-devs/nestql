import { DMMF } from '@prisma/generator-helper';
import { updateAppModelFiles } from '@base/generators/model-generator/update-app-model-files';
import { generateSeedFiles } from '@base/generators/model-generator/generate-seed-files';
import { generateModelFiles } from '@base/generators/model-generator/generate-model-files';
import { updateAppSeedFiles } from '@base/generators/model-generator/update-app-seed-files';
import {
	handleNoModelNameError,
	handleNoPrismaSchemaError,
} from '@base/generators/model-generator/common/handle-errors';
import {
	getPrismaModel,
	getCommandLineArgs,
} from '@base/generators/common/utils';

export const modelGenerator = async () => {
	const commandLineArgs = getCommandLineArgs();
	const modelName = commandLineArgs.model;

	if (!modelName) {
		handleNoModelNameError();
	}

	const prismaModel = (await getPrismaModel({ modelName })) as DMMF.Model;

	if (!prismaModel) {
		handleNoPrismaSchemaError({ modelName });
	}

	await generateModelFiles({ modelName });
	await updateAppModelFiles({ modelName });

	await generateSeedFiles({ modelName, prismaModel });
	await updateAppSeedFiles({ modelName });

	console.log('Model generated successfully 🎉');

	process.exit(0);
};
