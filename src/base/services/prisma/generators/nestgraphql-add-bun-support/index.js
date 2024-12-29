import prismaGeneratorHelper from '@prisma/generator-helper';
import { generatorName } from './common/constants/generator-name.js';
import { baseDirectory } from './common/constants/base-directory.js';
import { updateModelFile } from './common/modifiers/update-model-file.js';
import { updateListRelationFilterFile } from './common/modifiers/update-list-relation-filter.js';

const { generatorHandler } = prismaGeneratorHelper;

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
				await updateListRelationFilterFile({
					model,
					baseDirectory,
				});

				await updateModelFile({
					model,
					baseDirectory,
				});
			}
		} catch (error) {
			console.error(`${generatorName} failed:`, error);
			throw error;
		}
	},
});
