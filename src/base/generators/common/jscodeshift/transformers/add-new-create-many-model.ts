import { plural } from 'pluralize';
import { camelCase } from 'change-case';
import { JSCodeshift, Collection, ASTPath } from 'jscodeshift';

interface IOptions {
	root: any;
	modelName: string;
	jscodeshift: JSCodeshift;
}

/**
 * Adds a new createMany method call for the specified model after the last existing createMany call
 * in the seed.ts file.
 *
 * @param options - The options for adding a new createMany method
 * @param options.root - The jscodeshift root collection representing the AST
 * @param options.modelName - The name of the model to add the createMany method for
 * @param options.jscodeshift - The jscodeshift API
 * @returns void
 */
export const addNewCreateManyModel = ({
	root,
	modelName,
	jscodeshift,
}: IOptions): void => {
	// Convert the model name to the appropriate format for the createMany call
	const modelNameCamelCase = camelCase(modelName);
	const modelNameCamelCasePluralized = plural(modelNameCamelCase);

	/**
	 * Find the function expression that corresponds to the main async function in seed.ts
	 * The main function is defined as:
	 * const main = async () => { ... };
	 */
	const mainFunctionExpressions = root
		.find(jscodeshift.VariableDeclaration)
		.filter((path) => {
			// Check if this is the 'main' variable declaration
			const declarations = path.node.declarations;
			if (declarations.length !== 1) return false;

			const decl = declarations[0];
			if (decl.id.type !== 'Identifier' || decl.id.name !== 'main')
				return false;

			// Check if it's an async arrow function
			if (decl.init?.type !== 'ArrowFunctionExpression') return false;

			return decl.init.async === true;
		});

	// Process each found main function (should be only one)
	mainFunctionExpressions.forEach((path) => {
		// Get the function body to search within
		const declaration = path.node.declarations[0];
		const arrowFunction = declaration.init;

		if (
			arrowFunction?.type !== 'ArrowFunctionExpression' ||
			!arrowFunction.body
		) {
			return;
		}

		// If the body is just an expression, wrap it in a BlockStatement for consistent handling
		const functionBody =
			arrowFunction.body.type === 'BlockStatement'
				? arrowFunction.body
				: jscodeshift.blockStatement([
						jscodeshift.expressionStatement(arrowFunction.body),
				  ]);

		// Find all await expressions in the function body
		const createManyCalls = jscodeshift(functionBody)
			.find(jscodeshift.AwaitExpression)
			.filter((expr) => {
				const callExpr = expr.node.argument;
				// Check if it's a createMany call
				return (
					callExpr.type === 'CallExpression' &&
					callExpr.callee?.type === 'MemberExpression' &&
					callExpr.callee.property?.type === 'Identifier' &&
					callExpr.callee.property.name === 'createMany'
				);
			});

		// If we found at least one createMany call
		if (createManyCalls.length > 0) {
			// Get the last one
			const lastCreateMany = createManyCalls.at(-1);

			// Get the statement containing this call
			const lastStatement = lastCreateMany.closest(
				jscodeshift.ExpressionStatement,
			);

			// Create a new AST node structure for: await prisma.model.createMany({ data: [...models] });

			// Create the member expression for prisma.model.createMany
			const memberExpr = jscodeshift.memberExpression(
				jscodeshift.memberExpression(
					jscodeshift.identifier('prisma'),
					jscodeshift.identifier(modelNameCamelCase),
				),
				jscodeshift.identifier('createMany'),
			);

			// Create the object expression for { data: [...models] }
			const dataProperty = jscodeshift.property(
				'init',
				jscodeshift.identifier('data'),
				jscodeshift.arrayExpression([
					jscodeshift.spreadElement(
						jscodeshift.identifier(modelNameCamelCasePluralized),
					),
				]),
			);

			const objectExpr = jscodeshift.objectExpression([dataProperty]);

			// Create the call expression: prisma.model.createMany({ data: [...models] })
			const callExpr = jscodeshift.callExpression(memberExpr, [
				objectExpr,
			]);

			// Create the await expression: await prisma.model.createMany({ data: [...models] })
			const awaitExpr = jscodeshift.awaitExpression(callExpr);

			// Create the full statement
			const newStatement = jscodeshift.expressionStatement(awaitExpr);

			// Insert after the last createMany call
			lastStatement.insertAfter(newStatement);

			// Update the arrow function body with our modified AST if it wasn't a BlockStatement originally
			if (arrowFunction.body.type !== 'BlockStatement') {
				arrowFunction.body = functionBody;
			}
		}
	});
};
