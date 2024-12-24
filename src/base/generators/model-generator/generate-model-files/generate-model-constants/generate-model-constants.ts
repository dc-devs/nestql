import { generateModelConstantsFolder } from '@base/generators/model-generator/generate-model-files/generate-model-constants/generate-model-constants-folder';
import { generateModelConstantsIndexFile } from '@base/generators/model-generator/generate-model-files/generate-model-constants/generate-model-constants-index-file';
import { generateModelConstantsSelectFile } from '@base/generators/model-generator/generate-model-files/generate-model-constants/generate-model-constants-select-file';
import { generateModelConstantsModelNameFile } from '@base/generators/model-generator/generate-model-files/generate-model-constants/generate-model-constants-model-name-file';

interface IOptions {
	basePath: string;
	modelName: string;
}

export const generateModelConstants = async ({
	basePath,
	modelName,
}: IOptions) => {
	const constantsFolderPath = await generateModelConstantsFolder({
		basePath,
	});

	await generateModelConstantsModelNameFile({
		modelName,
		basePath: constantsFolderPath,
	});

	await generateModelConstantsSelectFile({
		modelName,
		basePath: constantsFolderPath,
	});

	await generateModelConstantsIndexFile({
		modelName,
		basePath: constantsFolderPath,
	});
};
