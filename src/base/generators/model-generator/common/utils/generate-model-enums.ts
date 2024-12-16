import { join } from 'path';
import { plural } from 'pluralize';
import { kebabCase, camelCase } from 'change-case';
import { mkdir, writeFile } from 'fs/promises';

interface IOptions {
	basePath: string;
	modelName: string;
}

export const generateModelEnumsModelFile = async ({
	modelName,
	basePath,
}: IOptions) => {
	const modelNameCamelCase = camelCase(modelName);

	const filePath = join(basePath, 'model.enum.ts');
	const fileContent = `export enum Model {
	Name = '${modelNameCamelCase}',
}`;

	await writeFile(filePath, fileContent);
};

export const generateModelEnumsIndexFile = async ({
	basePath,
	modelName,
}: IOptions) => {
	const modelNamePascalPluralized = plural(modelName);
	const modelNameLowerKebabCasePluralized = kebabCase(
		modelNamePascalPluralized,
	);
	const indexFilePath = join(basePath, 'index.ts');
	const fileContent = `export { Model } from '@models/${modelNameLowerKebabCasePluralized}/common/enums/model.enum';`;

	await writeFile(indexFilePath, fileContent);
};

export const generateModelEnumsFolder = async ({
	modelName,
	basePath,
}: IOptions) => {
	const enumsFolderPath = join(basePath, 'common', 'enums');

	await mkdir(enumsFolderPath, { recursive: true });

	return enumsFolderPath;
};

export const generateModelEnums = async ({ modelName, basePath }: IOptions) => {
	const enumsFolderPath = await generateModelEnumsFolder({
		modelName,
		basePath,
	});

	await generateModelEnumsIndexFile({
		modelName,
		basePath: enumsFolderPath,
	});

	await generateModelEnumsModelFile({
		modelName,
		basePath: enumsFolderPath,
	});
};
