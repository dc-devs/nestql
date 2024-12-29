import prismaGeneratorHelper from '@prisma/generator-helper';
import { resolve } from 'path';
import { join } from 'path';
import { promises as fs } from 'fs';

const { generatorHandler } = prismaGeneratorHelper;

const generatorName = 'Prisma NestJS/GraphQL - Bun Support';
const baseDirectory = resolve(
	process.cwd(),
	'src/app/models/common/@generated',
);

const updateListRelationFilterFile = async ({ modelName }) => {
	const modelNameLower = modelName.toLowerCase();
	const filePath = join(
		baseDirectory,
		`${modelNameLower}/${modelNameLower}-list-relation-filter.input.ts`,
	);

	let fileExists = false;
	try {
		await fs.access(filePath);
		fileExists = true;
	} catch {
		fileExists = false;
	}

	if (!fileExists) {
		return;
	}

	const listRelationFilterContent = await fs.readFile(filePath, 'utf8');
	const updatedListRelationFilterContent = listRelationFilterContent.replace(
		new RegExp(`: ${modelName}WhereInput;`, 'g'),
		`: ${modelName}WhereInput & {};`,
	);

	await fs.writeFile(filePath, updatedListRelationFilterContent);
};

generatorHandler({
	onManifest() {
		const manifest = {
			prettyName: generatorName,
			defaultOutput: baseDirectory,
			requiresEngineType: 'library',
		};

		return manifest;
	},
	async onGenerate(options) {
		const { models } = options.dmmf.datamodel;

		try {
			for (const model of models) {
				const modelName = model.name;
				await updateListRelationFilterFile({ modelName });
			}
		} catch (error) {
			console.error(`${generatorName} failed:`, error);
			throw error;
		}
	},
});
