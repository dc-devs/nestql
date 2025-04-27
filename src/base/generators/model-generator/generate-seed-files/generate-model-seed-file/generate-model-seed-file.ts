import { join } from 'path';
import { plural } from 'pluralize';
import { writeFile } from 'fs/promises';
import { DMMF } from '@prisma/generator-helper';
import { camelCase, kebabCase } from 'change-case';
import {
	getModelData,
	getFieldsAndTypes,
	getStringifiedModelData,
} from './common/utils';

interface IOptions {
	basePath: string;
	modelName: string;
	prismaModel: DMMF.Model;
}

export const generateModelSeedFile = async ({
	basePath,
	modelName,
	prismaModel,
}: IOptions) => {
	const modelNamePascalPluralized = plural(modelName);
	const modelNameLowerKebabCasePluralized = kebabCase(
		modelNamePascalPluralized,
	);
	const modelNameLowerCamelCasePluralized = camelCase(
		modelNamePascalPluralized,
	);
	const filePath = join(
		basePath,
		`${modelNameLowerKebabCasePluralized}.seed.ts`,
	);

	const fieldsAndTypes = getFieldsAndTypes({ prismaModel });
	const modelData = getModelData({ fieldsAndTypes });
	const stringifiedModelData = getStringifiedModelData({ modelData });

	const fileContent = `const ${modelNameLowerCamelCasePluralized} = [];

const first${modelName} = ${stringifiedModelData};
${modelNameLowerCamelCasePluralized}.push(first${modelName});

const second${modelName} = ${stringifiedModelData};
${modelNameLowerCamelCasePluralized}.push(second${modelName});

const third${modelName} = ${stringifiedModelData};
${modelNameLowerCamelCasePluralized}.push(third${modelName});

const fourth${modelName} = ${stringifiedModelData};
${modelNameLowerCamelCasePluralized}.push(fourth${modelName});

const all${modelNamePascalPluralized}Count = ${modelNameLowerCamelCasePluralized}.length;

export { ${modelNameLowerCamelCasePluralized}, first${modelName}, second${modelName}, third${modelName}, fourth${modelName}, all${modelNamePascalPluralized}Count };
`;

	await writeFile(filePath, fileContent);
};
