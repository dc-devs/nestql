import { join } from 'path';
import { writeFile } from 'fs/promises';
import { camelCase } from 'change-case';

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
}
`;

	await writeFile(filePath, fileContent);
};
