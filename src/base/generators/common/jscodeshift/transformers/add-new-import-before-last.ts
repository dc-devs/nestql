import type { JSCodeshift } from 'jscodeshift';

interface IOptions {
	root: any;
	moduleName: string;
	modulePath: string;
	jscodeshift: JSCodeshift;
}

export const addNewImportBeforeLast = ({
	root,
	moduleName,
	modulePath,
	jscodeshift,
}: IOptions) => {
	const {
		literal,
		identifier,
		importSpecifier,
		importDeclaration,
		ImportDeclaration,
	} = jscodeshift;

	// Find all import declarations
	const imports = root.find(ImportDeclaration);

	// If there are no imports, return unchanged
	if (imports.length === 0) return root.toSource({ quote: 'single' });

	// Get the last import
	const lastImportIndex = imports.length - 1;
	const lastImport = imports.at(lastImportIndex);

	// Create the new import declaration
	const newImport = importDeclaration(
		[importSpecifier(identifier(moduleName))],
		literal(modulePath),
	);

	// Check if import already exists
	const existingImport = imports.filter((path) => {
		const source = path.value.source.value;
		const importPathExists = source === modulePath;

		return importPathExists;
	});

	if (existingImport.length === 0) {
		// Simply insert the new import before the last one
		// Note: Cannot find an easy way to insert the new import after the last one without line break :/
		lastImport.insertBefore(newImport);
	}
};
