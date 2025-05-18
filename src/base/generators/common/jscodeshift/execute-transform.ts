import { File, Transform } from '@base/generators/common/enums';
import { filePaths, transformPaths } from '@base/generators/common/constants';
import { executeJscodeshiftTransform } from '@base/generators/common/jscodeshift/execute-jscodeshift-transform';

interface Params {
	file: File;
	transform: Transform;
	options?: Record<string, string | number | boolean>;
}

export const executeTransform = async ({
	file,
	options,
	transform,
}: Params) => {
	const filePath = filePaths[file];
	const transformPath = transformPaths[transform];

	await executeJscodeshiftTransform({
		filePath,
		transformPath,
		options,
	});
};
