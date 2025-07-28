import type { JSCodeshift } from 'jscodeshift';

interface IOptions {
	root: any;
	moduleName: string;
	modulePath: string;
	jscodeshift: JSCodeshift;
}

export const addNewExportBeforeLast = ({
	root,
	moduleName,
	modulePath,
	jscodeshift,
}: IOptions) => {
	const {
		literal,
		identifier,
		exportNamedDeclaration,
		ExportNamedDeclaration,
	} = jscodeshift;

	// Find all export declarations
	const exports = root.find(ExportNamedDeclaration);

	// If there are no exports, return unchanged
	if (exports.length === 0) return root.toSource({ quote: 'single' });

	// Get the last export
	const lastExportIndex = exports.length - 1;
	const lastExport = exports.at(lastExportIndex);

	// Create the module name identifier
	const moduleNameId = identifier(moduleName);
	const newExport = exportNamedDeclaration(
		null,
		[
			jscodeshift.exportSpecifier.from({
				local: moduleNameId,
				exported: moduleNameId,
			}),
		],
		literal(modulePath),
	);

	// Check if export already exists
	const existingExport = exports.filter((path) => {
		const source = path.value.source?.value;
		// Handle case where source might be null or undefined
		if (!source) return false;
		const exportPathExists = source === modulePath;

		return exportPathExists;
	});

	if (existingExport.length === 0) {
		// Simply insert the new export before the last one
		// Note: Cannot find an easy way to insert the new export after the last one without line break :/
		lastExport.insertBefore(newExport);
	}
};
