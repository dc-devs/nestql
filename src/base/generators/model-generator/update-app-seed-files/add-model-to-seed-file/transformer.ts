import {
	importPushNewModule,
	addNewCreateManyModel,
} from '@base/generators/common/jscodeshift/transformers';

export const parser = 'ts';
export const parserConfig = {
	decoratorsBeforeExport: true,
};

const transformer = (file, { jscodeshift }, { modelName }) => {
	const importPath = '@seeds/index';
	const root = jscodeshift(file.source);

	importPushNewModule({ root, jscodeshift, modelName, importPath });
	addNewCreateManyModel({ root, jscodeshift, modelName });

	// Configure jscodeshift print options for tabs
	return root.toSource({
		quote: 'single',
		useTabs: true,
		tabWidth: 4,
		wrapColumn: 100,
	});
};

export default transformer;
