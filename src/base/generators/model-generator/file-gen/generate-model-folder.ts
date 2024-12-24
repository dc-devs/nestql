import { plural } from 'pluralize';
import { mkdir } from 'fs/promises';
import { kebabCase } from 'change-case';
import path from 'path';

interface IOptions {
	modelName: string;
}

export const generateModelFolder = async ({ modelName }: IOptions) => {
	const modelNamePascalPluralized = plural(modelName);
	const modelNameLowerKebabCasePluralized = kebabCase(
		modelNamePascalPluralized,
	);

	const modelFolderPath = path.join(
		process.cwd(),
		'src',
		'app',
		'models',
		modelNameLowerKebabCasePluralized,
	);

	await mkdir(modelFolderPath, { recursive: true });

	return modelFolderPath;
};
