import { join } from 'path';
import { plural } from 'pluralize';
import { kebabCase } from 'change-case';
import { writeFile } from 'fs/promises';

interface IOptions {
	basePath: string;
	modelName: string;
}

export const generateModelConstantsIndexFile = async ({
	basePath,
	modelName,
}: IOptions) => {
	const modelNamePascalPluralized = plural(modelName);
	const modelNameLowerKebabCasePluralized = kebabCase(
		modelNamePascalPluralized,
	);
	const filePath = join(basePath, 'index.ts');
	const fileContent = `export { select } from '@models/${modelNameLowerKebabCasePluralized}/common/constants/select.constant';
export { modelName } from '@models/${modelNameLowerKebabCasePluralized}/common/constants/model-name.constant';
`;

	await writeFile(filePath, fileContent);
};
