import { plural } from 'pluralize';
import { mkdir } from 'fs/promises';
import { kebabCase } from 'change-case';
import path from 'path';

interface IOptions {
	modelName: string;
}

export const generateModelFolder = async ({ modelName }: IOptions) => {
	const modelNamePluralized = plural(modelName);
	const modelNamePluralizedKebabCase = kebabCase(modelNamePluralized);

	const modelFolderPath = path.join(
		process.cwd(),
		'src',
		'app',
		'models',
		modelNamePluralizedKebabCase,
	);

	await mkdir(modelFolderPath, { recursive: true });

	return modelFolderPath;
};
