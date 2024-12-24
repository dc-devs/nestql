import { resolve } from 'path';
import { executeTransform } from '@base/generators/model-generator/jscodeshift/execute-transform';
import {
	handleNoModelNameError,
	handleNoPrismaSchemaError,
} from '@base/generators/model-generator/common/log-errors';
import {
	getCommandLineArgs,
	getParsedPrismaSchema,
} from '@base/generators/common/utils';
import {
	generateModelEnums,
	generateModelFolder,
	generateModelConstants,
	generateModelModuleFile,
	generateModelServiceFile,
	generateModelResolverFile,
} from '@base/generators/model-generator/file-gen';

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

	// model files
	// -----------------------------------------------------------------

	// add base model folder
	const modelFolderPath = await generateModelFolder({ modelName });

	// add supporting folders/files
	await generateModelEnums({ basePath: modelFolderPath, modelName });
	await generateModelConstants({ basePath: modelFolderPath, modelName });

	// model files
	await generateModelModuleFile({ basePath: modelFolderPath, modelName });
	await generateModelServiceFile({ basePath: modelFolderPath, modelName });
	await generateModelResolverFile({ basePath: modelFolderPath, modelName });

	// -----------------------------------------------------------------

	// app files
	// -----------------------------------------------------------------

	enum TransformPath {
		AddNewModuleToAppModule = 'AddNewModuleToAppModule',
	}

	const addNewModuleToAppModule = resolve(
		process.cwd(),
		'src/base/generators/model-generator/jscodeshift/transformers/add-new-module-to-app-module.ts',
	);

	const transformPaths = {
		[TransformPath.AddNewModuleToAppModule]: addNewModuleToAppModule,
	};

	const appModule = resolve(process.cwd(), 'src/app/app.module.ts');

	// add import to app module

	await executeTransform({
		filePath: appModule,
		transformPath: transformPaths[TransformPath.AddNewModuleToAppModule],
	});
	// -----------------------------------------------------------------

	console.log('Model generated successfully 🎉');

	process.exit(0);
};
