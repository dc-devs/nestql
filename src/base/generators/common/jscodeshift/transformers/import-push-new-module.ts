import { plural } from 'pluralize';
import { camelCase } from 'change-case';

interface Params {
	root: any;
	jscodeshift: any;
	modelName: string;
	importPath: string;
}

export const importPushNewModule = ({
	root,
	modelName,
	importPath,
	jscodeshift,
}: Params) => {
	const { identifier } = jscodeshift;
	const modelNamePascalPluralized = plural(modelName);
	const modelNameCamelCasePluralized = camelCase(modelNamePascalPluralized);

	// Find import declarations from @seeds/index
	root.find(jscodeshift.ImportDeclaration, {
		source: {
			value: importPath,
		},
	}).forEach((path) => {
		const specifiers = path.node.specifiers;

		// Check if the new module is already imported
		const alreadyImported = specifiers.some(
			(specifier) =>
				specifier.type === 'ImportSpecifier' &&
				specifier.imported.name === modelNameCamelCasePluralized,
		);

		// If not already imported, add it to the specifiers
		if (!alreadyImported) {
			path.node.specifiers = [
				...specifiers,
				jscodeshift.importSpecifier(
					identifier(modelNameCamelCasePluralized),
				),
			];
		}
	});
};
