import {
	getCommandLineArgs,
	getParsedPrismaSchema,
} from '@base/generators/common/utils';
import {
	generateModelFolder,
	generateModelConstants,
	generateModelModuleFile,
	generateModelServiceFile,
} from '@base/generators/model-generator/common/utils';

export const modelGenerator = async () => {
	const commandLineArgs = getCommandLineArgs();
	const modelName = commandLineArgs.model;
	const parsedPrismaSchema = await getParsedPrismaSchema({ modelName });

	if (!parsedPrismaSchema) {
		console.error(
			'\n' +
				`Error: Model '${modelName}' not found in prisma schema.` +
				'\n' +
				'\n' +
				'The NestQl model generator uses the prisma schema as the source of truth when generating model files, ' +
				`please ensure the '${modelName}' model exists in the prisma schema before running the generator.` +
				'\n',
		);
		return;
	}

	const modelFolderPath = await generateModelFolder({ modelName });

	await generateModelModuleFile({ basePath: modelFolderPath, modelName });
	await generateModelServiceFile({ basePath: modelFolderPath, modelName });
	await generateModelConstants({ basePath: modelFolderPath, modelName });

	console.log('Model generated successfully 🎉');
};
