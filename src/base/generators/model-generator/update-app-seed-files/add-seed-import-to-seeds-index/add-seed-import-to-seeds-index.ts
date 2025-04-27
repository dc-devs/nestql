import { File, Transform } from '@base/generators/common/enums';
import { executeTransform } from '@base/generators/common/jscodeshift/execute-transform';

interface IOptions {
	modelName: string;
}

export const addSeedImportToSeedsIndex = async ({ modelName }: IOptions) => {
	await executeTransform({
		file: File.SeedsIndex,
		transform: Transform.AddSeedImportToSeedsIndex,
		options: { modelName },
	});
};
