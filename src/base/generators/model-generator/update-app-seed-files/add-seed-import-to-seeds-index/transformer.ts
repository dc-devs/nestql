import { plural } from 'pluralize';
import { camelCase, kebabCase } from 'change-case';
import { addNewExportBeforeLast } from '@base/generators/common/jscodeshift/transformers';

export const parser = 'ts';
export const parserConfig = {
	decoratorsBeforeExport: true,
};

const transformer = (file, { jscodeshift }, { modelName }) => {
	const root = jscodeshift(file.source);
	const modelNamePascalPluralized = plural(modelName);
	const modelNameCamelCasePluralized = camelCase(modelNamePascalPluralized);
	const modelNameLowerKebabCasePluralized = kebabCase(
		modelNamePascalPluralized,
	);
	const modulePath = `@seeds/${modelNameLowerKebabCasePluralized}.seed`;
	const moduleName = modelNameCamelCasePluralized;

	addNewExportBeforeLast({ root, jscodeshift, moduleName, modulePath });

	return root.toSource({ quote: 'single' });
};

export default transformer;
