import { join } from 'path';
import { mkdir } from 'fs/promises';

interface IOptions {
	basePath: string;
}

export const generateModelEnumsFolder = async ({ basePath }: IOptions) => {
	const enumsFolderPath = join(basePath, 'common', 'enums');

	await mkdir(enumsFolderPath, { recursive: true });

	return enumsFolderPath;
};
