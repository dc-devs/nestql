import { File, Transform } from '@base/generators/common/enums';
import { executeTransform } from '@base/generators/common/jscodeshift/execute-transform';

interface IOptions {
	modelName: string;
}

export const addModelToSeedFile = async ({ modelName }: IOptions) => {
	await executeTransform({
		file: File.SeedFile,
		transform: Transform.AddModelToSeedFile,
		options: { modelName },
	});
};
