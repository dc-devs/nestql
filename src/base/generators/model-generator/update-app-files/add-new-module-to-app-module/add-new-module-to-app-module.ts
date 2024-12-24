import { File, Transform } from '@base/generators/common/enums';
import { filePaths, transformPaths } from '@base/generators/common/constants';
import { executeTransform } from '@base/generators/common/jscodeshift/execute-transform';

interface IWrapperOptions {
	file: File;
	transform: Transform;
}

const executeTransformWrapper = async ({
	file,
	transform,
}: IWrapperOptions) => {
	const filePath = filePaths[file];
	const transformPath = transformPaths[transform];

	await executeTransform({
		filePath,
		transformPath,
	});
};

interface IOptions {
	modelName: string;
}

export const addNewModuleToAppModule = async ({ modelName }: IOptions) => {
	await executeTransformWrapper({
		file: File.AppModule,
		transform: Transform.AddNewModuleToAppModule,
	});
};
