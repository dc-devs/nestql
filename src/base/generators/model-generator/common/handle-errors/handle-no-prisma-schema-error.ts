interface IOptions {
	modelName: string;
}

export const handleNoPrismaSchemaError = ({ modelName }: IOptions) => {
	console.error(
		'\n' +
			`Error: Model '${modelName}' not found in prisma schema.` +
			'\n' +
			'\n' +
			'The NestQl model generator uses the prisma schema as the source of truth when generating model files, ' +
			`please ensure the '${modelName}' model exists in the prisma schema before running the generator.` +
			'\n',
	);

	process.exit(1);
};
