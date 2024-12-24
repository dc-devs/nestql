import { join } from 'path';
import { plural } from 'pluralize';
import { writeFile } from 'fs/promises';
import { kebabCase } from 'change-case';

interface IOptions {
	basePath: string;
	modelName: string;
}

export const generateModelEnumsIndexFile = async ({
	basePath,
	modelName,
}: IOptions) => {
	const modelNamePascalPluralized = plural(modelName);
	const modelNameLowerKebabCasePluralized = kebabCase(
		modelNamePascalPluralized,
	);
	const filePath = join(basePath, 'index.ts');
	const fileContent = `export { Model } from '@models/${modelNameLowerKebabCasePluralized}/common/enums/model.enum';`;

	await writeFile(filePath, fileContent);
};
