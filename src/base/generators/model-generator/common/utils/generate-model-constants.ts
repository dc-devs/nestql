import { join, relative } from 'path';
import { plural } from 'pluralize';
import { kebabCase } from 'change-case';
import { mkdir, writeFile } from 'fs/promises';

interface IOptions {
	basePath: string;
	modelName: string;
}

export const generateModelConstantsSelectFile = async ({
	basePath,
	modelName,
}: IOptions) => {
	const modelNamePascalPluralized = plural(modelName);
	const modelNameLowerKebabCasePluralized = kebabCase(
		modelNamePascalPluralized,
	);
	const fileName = 'default-select.constant.ts';
	const filePath = join(basePath, fileName);
	const fileContent = `export const select = {};

/* 
 By default, the database will return all available fields for this model.
 If, by default, you want to select only certain fields, you can activate this default select object.

 This is useful for scenarios where you might want sensitive fields to be hidden from the response.
 You can see an example of this in the User model where we omit the password field from the response.

 To activate the select object, you'll need to:
*/

/*

/${modelNameLowerKebabCasePluralized}.service.ts

1. Import the select object
----------------------------------------------
	import { 
		select,
		modelName,
	} from '@models/posts/common/constants';
----------------------------------------------

2. Add the select object to the constructor
----------------------------------------------
	constructor(protected prisma: PrismaService) {
		super({
			select,
			prisma,
			modelName,
		});
	}
----------------------------------------------

*/

/*

/${fileName} (this file)

1. Update the select object to include the fields you want to select.
----------------------------------------------
select = {
	id: true,
	title: true,
	content: true,
	updatedAt: true,
	createdAt: true,
};
----------------------------------------------
 
*/
`;

	await writeFile(filePath, fileContent);
};

export const generateModelConstantsModelNameFile = async ({
	modelName,
	basePath,
}: IOptions) => {
	const modelNamePascalPluralized = plural(modelName);
	const modelNameLowerKebabCasePluralized = kebabCase(
		modelNamePascalPluralized,
	);
	const indexFilePath = join(basePath, 'model-name.constant.ts');
	const fileContent = `import { Model } from '@models/${modelNameLowerKebabCasePluralized}/common/enums';

export const modelName = Model.Name;
`;

	await writeFile(indexFilePath, fileContent);
};

export const generateModelConstantsIndexFile = async ({
	basePath,
	modelName,
}: IOptions) => {
	const modelNamePascalPluralized = plural(modelName);
	const modelNameLowerKebabCasePluralized = kebabCase(
		modelNamePascalPluralized,
	);
	const indexFilePath = join(basePath, 'index.ts');
	const fileContent = `export { modelName } from '@models/${modelNameLowerKebabCasePluralized}/common/constants/model-name.constant';
export { select } from '@models/${modelNameLowerKebabCasePluralized}/common/constants/default-select.constant';
`;

	await writeFile(indexFilePath, fileContent);
};

export const generateModelConstantsFolder = async ({
	modelName,
	basePath,
}: IOptions) => {
	const constantsFolderPath = join(basePath, 'common', 'constants');

	await mkdir(constantsFolderPath, { recursive: true });

	return constantsFolderPath;
};

export const generateModelConstants = async ({
	modelName,
	basePath,
}: IOptions) => {
	const constantsFolderPath = await generateModelConstantsFolder({
		modelName,
		basePath,
	});

	await generateModelConstantsIndexFile({
		modelName,
		basePath: constantsFolderPath,
	});

	await generateModelConstantsModelNameFile({
		modelName,
		basePath: constantsFolderPath,
	});

	await generateModelConstantsSelectFile({
		modelName,
		basePath: constantsFolderPath,
	});
};
