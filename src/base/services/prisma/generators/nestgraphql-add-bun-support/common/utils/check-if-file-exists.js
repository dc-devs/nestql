import { promises as fs } from 'fs';

export const checkIfFileExists = async (filePath) => {
	let fileExists = false;

	try {
		await fs.access(filePath);
		fileExists = true;
	} catch {
		fileExists = false;
	}

	return fileExists;
};
