import { join } from 'path';
import { promises as fs } from 'fs';
import { checkIfFileExists } from '../utils/check-if-file-exists.js';
import { getFieldsWithRelationFromFields } from '../utils/get-fields-with-relation-from-fields.js';
export const updateModelFile = async ({ model, baseDirectory }) => {
	// Setup variables
	const modelName = model.name;
	const modelNameLower = modelName.toLowerCase();
	const filePath = join(
		baseDirectory,
		`${modelNameLower}/${modelNameLower}.model.ts`,
	);

	// Check if the file exists
	const fileExists = await checkIfFileExists(filePath);

	if (!fileExists) {
		return;
	}

	// Get file content
	const content = await fs.readFile(filePath, 'utf8');
	let updatedContent = content;

	const fieldsWithRelationFromFields = getFieldsWithRelationFromFields(model);

	// Update the file content
	for (const field of fieldsWithRelationFromFields) {
		const modelNameLower = field.name;
		const modelNamePascal = field.type;
		const regex = new RegExp(
			`${modelNameLower}\\?:\\s*${modelNamePascal};`,
			'gm',
		);
		const replacement = `${modelNameLower}?: ${modelNamePascal} & {};`;

		updatedContent = content.replace(regex, replacement);
	}

	// Write the updated content to the file
	await fs.writeFile(filePath, updatedContent);
};
