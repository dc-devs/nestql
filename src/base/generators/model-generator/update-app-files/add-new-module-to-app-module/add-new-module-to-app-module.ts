import { File, Transform } from '@base/generators/common/enums';
import { executeTransform } from '@base/generators/common/jscodeshift/execute-transform';
import { getCommandLineArgs } from '@base/generators/common/utils';

export const addNewModuleToAppModule = async () => {
	const commandLineArgs = getCommandLineArgs();
	console.log('commandLineArgs', commandLineArgs);
	const modelName = commandLineArgs.model;

	console.log('modelName', modelName);

	await executeTransform({
		file: File.AppModule,
		transform: Transform.AddNewModuleToAppModule,
		options: { modelName },
	});
};
