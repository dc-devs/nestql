import { join } from 'path';
import { DMMF } from '@prisma/generator-helper';
import { generateModelSeedFile } from '@root/src/base/generators/model-generator/generate-seed-files/generate-model-seed-file/generate-model-seed-file';

interface IOptions {
	modelName: string;
	prismaModel: DMMF.Model;
}

export const generateSeedFiles = async ({
	modelName,
	prismaModel,
}: IOptions) => {
	const seedFolderPath = join(process.cwd(), 'prisma', 'seeds');

	await generateModelSeedFile({
		modelName,
		prismaModel,
		basePath: seedFolderPath,
	});
};
