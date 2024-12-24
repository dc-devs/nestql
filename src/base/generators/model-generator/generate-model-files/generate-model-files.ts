import { generateModelEnums } from '@base/generators/model-generator/generate-model-files/generate-model-enums/generate-model-enums';
import { generateModelFolder } from '@base/generators/model-generator/generate-model-files/generate-model-folder';
import { generateModelConstants } from '@base/generators/model-generator/generate-model-files/generate-model-constants/generate-model-constants';
import { generateModelModuleFile } from '@base/generators/model-generator/generate-model-files/generate-model-module-file';
import { generateModelServiceFile } from '@base/generators/model-generator/generate-model-files/generate-model-service-file';
import { generateModelResolverFile } from '@base/generators/model-generator/generate-model-files/generate-model-resolver-file';

interface IOptions {
	modelName: string;
}

export const generateModelFiles = async ({ modelName }: IOptions) => {
	// add base model folder
	const modelFolderPath = await generateModelFolder({ modelName });

	// add supporting folders/files
	await generateModelEnums({ basePath: modelFolderPath, modelName });
	await generateModelConstants({ basePath: modelFolderPath, modelName });

	// model files
	await generateModelModuleFile({ basePath: modelFolderPath, modelName });
	await generateModelServiceFile({ basePath: modelFolderPath, modelName });
	await generateModelResolverFile({ basePath: modelFolderPath, modelName });
};
