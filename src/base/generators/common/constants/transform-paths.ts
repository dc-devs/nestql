import { resolve } from 'path';
import { Transform } from '@base/generators/common/enums';

export const transformPaths = {
	[Transform.AddNewModuleToAppModule]: resolve(
		process.cwd(),
		'src/base/generators/model-generator/update-app-files/add-new-module-to-app-module/transformer.ts',
	),
};
