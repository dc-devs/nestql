import { run } from 'jscodeshift/src/Runner';

interface IOptions {
	transformPath: string;
	filePath: string;
	options?: Record<string, string | number | boolean>;
}

export const executeJscodeshiftTransform = async ({
	filePath,
	transformPath,
	options,
}: IOptions) => {
	await run(transformPath, [filePath], {
		dry: false,
		print: false,
		verbose: 1,
		...options,
	});
};
