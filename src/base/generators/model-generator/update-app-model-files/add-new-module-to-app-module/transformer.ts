import { plural } from 'pluralize';
import { kebabCase } from 'change-case';
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
	const modelNamePascalPluralized = plural(modelName);
	const modelNameLowerKebabCasePluralized = kebabCase(
		modelNamePascalPluralized,
	);
	const modulePath = `@models/${modelNameLowerKebabCasePluralized}/${modelNameLowerKebabCasePluralized}.module`;
	const moduleName = `${modelNamePascalPluralized}Module`;

	addNewImportBeforeLast({ root, jscodeshift, moduleName, modulePath });
	moduleImportsPush({ root, jscodeshift, modelName });

	return root.toSource({ quote: 'single' });
};

export default transformer;
