import { addSeedImportToSeedsIndex } from '@base/generators/model-generator/update-app-seed-files/add-seed-import-to-seeds-index';

interface IOptions {
	modelName: string;
}

export const updateAppSeedFiles = async ({ modelName }: IOptions) => {
	await addSeedImportToSeedsIndex({ modelName });
};
