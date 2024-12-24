import { join } from 'path';
import { mkdir } from 'fs/promises';

interface IOptions {
	basePath: string;
}

export const generateModelConstantsFolder = async ({ basePath }: IOptions) => {
	const folderPath = join(basePath, 'common', 'constants');

	await mkdir(folderPath, { recursive: true });

	return folderPath;
};
