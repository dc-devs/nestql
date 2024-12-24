import { generateModelEnumsFolder } from '@base/generators/model-generator/file-gen/generate-model-enums/generate-model-enums-folder';
import { generateModelEnumsModelFile } from '@base/generators/model-generator/file-gen/generate-model-enums/generate-model-enums-model-file';
import { generateModelEnumsIndexFile } from '@base/generators/model-generator/file-gen/generate-model-enums/generate-model-enums-index-file';

interface IOptions {
	basePath: string;
	modelName: string;
}

export const generateModelEnums = async ({ modelName, basePath }: IOptions) => {
	const enumsFolderPath = await generateModelEnumsFolder({
		basePath,
	});

	await generateModelEnumsModelFile({
		modelName,
		basePath: enumsFolderPath,
	});

	await generateModelEnumsIndexFile({
		modelName,
		basePath: enumsFolderPath,
	});
};
