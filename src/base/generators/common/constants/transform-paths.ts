import { resolve } from 'path';
import { Transform } from '@base/generators/common/enums';

export const transformPaths = {
	[Transform.AddModelToSeedFile]: resolve(
		process.cwd(),
		'src/base/generators/model-generator/update-app-seed-files/add-model-to-seed-file/transformer.ts',
	),
	[Transform.AddNewModuleToAppModule]: resolve(
		process.cwd(),
		'src/base/generators/model-generator/update-app-model-files/add-new-module-to-app-module/transformer.ts',
	),
	[Transform.AddSeedImportToSeedsIndex]: resolve(
		process.cwd(),
		'src/base/generators/model-generator/update-app-seed-files/add-seed-import-to-seeds-index/transformer.ts',
	),
};
