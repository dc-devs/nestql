import {
	moduleImportsPush,
	addNewImportBeforeLast,
} from '@base/generators/common/jscodeshift/transformers';

export const parser = 'ts';
export const parserConfig = {
	decoratorsBeforeExport: true,
};

const transformer = (file, { jscodeshift }) => {
	const root = jscodeshift(file.source);

	addNewImportBeforeLast({ root, jscodeshift });
	moduleImportsPush({ root, jscodeshift });

	return root.toSource();
};

export default transformer;
