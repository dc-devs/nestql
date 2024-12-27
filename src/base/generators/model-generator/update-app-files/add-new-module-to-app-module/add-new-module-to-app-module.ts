import { File, Transform } from '@base/generators/common/enums';
import { executeTransform } from '@base/generators/common/jscodeshift/execute-transform';

interface IOptions {
	modelName: string;
}

export const addNewModuleToAppModule = async ({ modelName }: IOptions) => {
	await executeTransform({
		file: File.AppModule,
		transform: Transform.AddNewModuleToAppModule,
		options: { modelName },
	});
};
