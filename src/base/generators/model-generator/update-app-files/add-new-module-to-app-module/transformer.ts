import {
	moduleImportsPush,
	addNewImportBeforeLast,
} from '@base/generators/common/jscodeshift/transformers';

export const parser = 'ts';
export const parserConfig = {
	decoratorsBeforeExport: true,
};

const transformer = (file, { jscodeshift }, { modelName }) => {
	const root = jscodeshift(file.source);

	addNewImportBeforeLast({ root, jscodeshift, modelName });
	moduleImportsPush({ root, jscodeshift, modelName });

	return root.toSource();
};

export default transformer;
