import { File, Transform } from '@base/generators/common/enums';
import { filePaths, transformPaths } from '@base/generators/common/constants';
import { executeJscodeshiftTransform } from '@base/generators/common/jscodeshift/execute-jscodeshift-transform';

interface IWrapperOptions {
	file: File;
	transform: Transform;
	options?: Record<string, string | number | boolean>;
}

export const executeTransform = async ({
	file,
	transform,
	options,
}: IWrapperOptions) => {
	const filePath = filePaths[file];
	const transformPath = transformPaths[transform];
	console.log(
		'[Generator]::executeTransform',
		filePath,
		transformPath,
		options,
	);

	await executeJscodeshiftTransform({
		filePath,
		transformPath,
		options,
	});
};
