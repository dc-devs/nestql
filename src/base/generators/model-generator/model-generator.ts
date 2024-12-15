import * as pluralize from 'pluralize';
import * as changeCase from 'change-case';
import {
	getCommandLineArgs,
	getParsedPrismaSchema,
} from '@base/generators/common/utils';

export const modelGenerator = async () => {
	const commandLineArgs = getCommandLineArgs();
	const modelName = commandLineArgs.model;

	const parsedPrismaSchema = await getParsedPrismaSchema({ modelName });

	if (!parsedPrismaSchema) {
		console.error(
			'\n' +
				`Error: Model '${modelName}' not found in prisma schema.` +
				'\n' +
				'\n' +
				'The NestQl model generator uses the prisma schema as the source of truth when generating model files, ' +
				`please ensure the '${modelName}' model exists in the prisma schema before running the generator.` +
				'\n',
		);
		return;
	}

	console.log('modelName', modelName);
	console.log('parsedPrismaSchema', parsedPrismaSchema);
	// const modelNamePluralized = pluralize.plural(commandLineArgs.model);
	// console.log('modelNamePluralized', modelNamePluralized);

	// const modelNamekebabCase = changeCase.kebabCase(modelName);
	// console.log('modelNamekebabCase', modelNamekebabCase);
};
