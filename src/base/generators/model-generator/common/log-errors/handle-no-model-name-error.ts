export const handleNoModelNameError = () => {
	console.error(
		'\n' +
			`Error: No model name provided. Please provide a model name when running the generator.` +
			'\n' +
			'\n' +
			'Eg: bun nql:generate:model --model=Post' +
			'\n',
	);

	process.exit(1);
};
