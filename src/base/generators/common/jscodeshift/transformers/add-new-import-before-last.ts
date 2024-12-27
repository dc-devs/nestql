import { plural } from 'pluralize';
import { kebabCase } from 'change-case';

interface IOptions {
	root: any;
	jscodeshift: any;
	modelName: string;
}

export const addNewImportBeforeLast = ({
	root,
	jscodeshift,
	modelName,
}: IOptions) => {
	const {
		literal,
		identifier,
		importSpecifier,
		importDeclaration,
		ImportDeclaration,
	} = jscodeshift;
	const modelNamePascalPluralized = plural(modelName);
	const modelNameLowerKebabCasePluralized = kebabCase(
		modelNamePascalPluralized,
	);
	const modulePath = `@models/${modelNameLowerKebabCasePluralized}/${modelNameLowerKebabCasePluralized}.module`;
	const moduleName = `${modelNamePascalPluralized}Module`;

	// Find all import declarations
	const imports = root.find(ImportDeclaration);

	// If there are no imports, return unchanged
	if (imports.length === 0) return root.toSource();

	// Get the last import
	const lastImportIndex = imports.length - 1;
	const lastImport = imports.at(lastImportIndex);

	// Create the new import declaration
	const newImport = importDeclaration(
		[importSpecifier(identifier(moduleName))],
		literal(modulePath),
	);

	// Check if PostsModule import already exists
	const existingPostsImport = imports.filter((path) => {
		const source = path.value.source.value;
		const importPathExists = source === modulePath;

		return importPathExists;
	});

	if (existingPostsImport.length === 0) {
		// Simply insert the new import before the last one
		// Note: Cannot find an easy way to insert the new import after the last one without line break :/
		lastImport.insertBefore(newImport);
	}
};
