import { join } from 'path';
import { plural } from 'pluralize';
import { kebabCase } from 'change-case';
import { writeFile } from 'fs/promises';

interface IOptions {
	basePath: string;
	modelName: string;
}
export const generateModelConstantsModelNameFile = async ({
	modelName,
	basePath,
}: IOptions) => {
	const modelNamePascalPluralized = plural(modelName);
	const modelNameLowerKebabCasePluralized = kebabCase(
		modelNamePascalPluralized,
	);
	const filePath = join(basePath, 'model-name.constant.ts');
	const fileContent = `import { Model } from '@models/${modelNameLowerKebabCasePluralized}/common/enums';

export const modelName = Model.Name;
`;

	await writeFile(filePath, fileContent);
};
