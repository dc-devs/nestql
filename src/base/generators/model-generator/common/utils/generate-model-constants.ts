import { plural } from 'pluralize';
import { mkdir } from 'fs/promises';
import { kebabCase } from 'change-case';
import path from 'path';

interface IOptions {
	basePath: string;
	modelName: string;
}

export const generateModelConstants = async ({
	modelName,
	basePath,
}: IOptions) => {
	const modelNamePluralized = plural(modelName);
	const modelNamePluralizedKebabCase = kebabCase(modelNamePluralized);
	const modelFolderPath = path.join(basePath, 'common', 'constants');

	await mkdir(modelFolderPath, { recursive: true });

	return modelFolderPath;
};
