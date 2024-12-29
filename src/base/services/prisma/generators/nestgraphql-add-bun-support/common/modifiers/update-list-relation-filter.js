import { join } from 'path';
import { promises as fs } from 'fs';
import { checkIfFileExists } from '../utils/check-if-file-exists.js';

export const updateListRelationFilterFile = async ({
	modelName,
	baseDirectory,
}) => {
	// Setup variables
	const modelNameLower = modelName.toLowerCase();
	const filePath = join(
		baseDirectory,
		`${modelNameLower}/${modelNameLower}-list-relation-filter.input.ts`,
	);

	// Check if the file exists
	const fileExists = await checkIfFileExists(filePath);

	if (!fileExists) {
		return;
	}

	// Get file content
	const content = await fs.readFile(filePath, 'utf8');

	// Update the file content
	const regex = new RegExp(`: ${modelName}WhereInput;`, 'g');
	const replacement = `: ${modelName}WhereInput & {};`;
	const updatedContent = content.replace(regex, replacement);

	// Write the updated content to the file
	await fs.writeFile(filePath, updatedContent);
};
