import { plural } from 'pluralize';
import { camelCase } from 'change-case';
import { JSCodeshift } from 'jscodeshift';

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
	const modelNameCamelCase = camelCase(modelName);
	const modelNameCamelCasePluralized = plural(modelNameCamelCase);

	// Find the main function to modify
	const mainFunction = root.find(jscodeshift.VariableDeclaration, {
		declarations: [
			{
				id: { type: 'Identifier', name: 'main' },
				init: { type: 'ArrowFunctionExpression', async: true },
			},
		],
	});

	if (mainFunction.length === 0) return;

	// Get the function body
	const funcDecl = mainFunction.get().node.declarations[0];
	if (funcDecl.init.type !== 'ArrowFunctionExpression') return;

	const funcBody = funcDecl.init.body;
	if (funcBody.type !== 'BlockStatement') return;

	// Find all createMany statements
	const createManyStatements = jscodeshift(funcBody)
		.find(jscodeshift.ExpressionStatement)
		.filter((path) => {
			const expr = path.node.expression;
			return (
				expr.type === 'AwaitExpression' &&
				expr.argument &&
				expr.argument.type === 'CallExpression' &&
				expr.argument.callee &&
				expr.argument.callee.type === 'MemberExpression' &&
				expr.argument.callee.property &&
				expr.argument.callee.property.type === 'Identifier' &&
				expr.argument.callee.property.name === 'createMany'
			);
		});

	if (createManyStatements.length === 0) return;

	// Get the last createMany statement
	const lastCreateMany = createManyStatements.at(-1);

	// Directly create an AST node for our new statement
	// Create the member expression for prisma.model.createMany
	const memberExpr = jscodeshift.memberExpression(
		jscodeshift.memberExpression(
			jscodeshift.identifier('prisma'),
			jscodeshift.identifier(modelNameCamelCase),
		),
		jscodeshift.identifier('createMany'),
	);

	// Create the array expression for [...models]
	const dataArray = jscodeshift.arrayExpression([
		jscodeshift.spreadElement(
			jscodeshift.identifier(modelNameCamelCasePluralized),
		),
	]);

	// Create the data property
	const dataProperty = jscodeshift.property(
		'init',
		jscodeshift.identifier('data'),
		dataArray,
	);

	// Create the object expression { data: [...models] }
	const objExpr = jscodeshift.objectExpression([dataProperty]);

	// Create the call expression prisma.model.createMany({ data: [...models] })
	const callExpr = jscodeshift.callExpression(memberExpr, [objExpr]);

	// Create the await expression
	const awaitExpr = jscodeshift.awaitExpression(callExpr);

	// Create the expression statement
	const newStatement = jscodeshift.expressionStatement(awaitExpr);

	// Insert after the last createMany statement
	lastCreateMany.insertAfter(newStatement);
};
