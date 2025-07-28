import { join } from 'path';
import { writeFile } from 'fs/promises';
import type { DMMF } from '@prisma/generator-helper';

interface IOptions {
	basePath: string;
	prismaModel: DMMF.Model;
}

export const generateModelConstantsSelectFile = async ({
	basePath,
	prismaModel,
}: IOptions) => {
	const fileName = 'select.constant.ts';
	const filePath = join(basePath, fileName);
	const selectFields = prismaModel.fields
		.filter((field) => field.name !== 'password')
		.map((field) => `\t${field.name}: true`)
		.join(',\n');

	const fileContent = `export const select = {\n${selectFields}\n}`;

	await writeFile(filePath, fileContent);
};
