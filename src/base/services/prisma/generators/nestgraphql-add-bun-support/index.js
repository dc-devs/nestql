import { resolve } from 'path';
import prismaGeneratorHelper from '@prisma/generator-helper';
import { updateListRelationFilterFile } from './common/modifiers/update-list-relation-filter.js';

const { generatorHandler } = prismaGeneratorHelper;

// TODO:Maybe Refactor out of this file
const generatorName = 'Prisma NestJS/GraphQL - Updates For Bun Support';
const baseDirectory = resolve(
	process.cwd(),
	'src/app/models/common/@generated',
);

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

				await updateListRelationFilterFile({
					modelName,
					baseDirectory,
				});
			}
		} catch (error) {
			console.error(`${generatorName} failed:`, error);
			throw error;
		}
	},
});
