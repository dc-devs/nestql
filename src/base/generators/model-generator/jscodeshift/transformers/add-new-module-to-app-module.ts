import {
	moduleImportsPush,
	addNewImportBeforeLast,
} from '@base/generators/model-generator/jscodeshift/common/utils';

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
