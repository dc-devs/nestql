import { plural } from 'pluralize';

interface IOptions {
	root: any;
	jscodeshift: any;
	modelName: string;
}

export const moduleImportsPush = ({
	root,
	jscodeshift,
	modelName,
}: IOptions) => {
	const { identifier } = jscodeshift;
	const modelNamePascalPluralized = plural(modelName);
	const moduleName = `${modelNamePascalPluralized}Module`;
	// Find the class declaration with the Module decorator
	// Find the class with Module decorator
	const classWithDecorator = root
		.find(jscodeshift.ClassDeclaration)
		.filter(
			(path) => path.node.decorators && path.node.decorators.length > 0,
		);

	// Process the Module decorator
	classWithDecorator.forEach((path) => {
		const decorator = path.node.decorators[0];
		if (
			decorator.expression.type === 'CallExpression' &&
			decorator.expression.callee.type === 'Identifier' &&
			decorator.expression.callee.name === 'Module'
		) {
			const moduleArgs = decorator.expression.arguments[0];

			if (moduleArgs && moduleArgs.properties) {
				const importsProperty = moduleArgs.properties.find(
					(prop) => prop.key.name === 'imports',
				);

				if (
					importsProperty &&
					importsProperty.value.type === 'ArrayExpression'
				) {
					// Check if PostsModule is already in the imports array
					const hasPostsModule = importsProperty.value.elements.some(
						(element) => element.name === moduleName,
					);

					if (!hasPostsModule) {
						importsProperty.value.elements.push(
							identifier(moduleName),
						);
					}
				}
			}
		}
	});
};
