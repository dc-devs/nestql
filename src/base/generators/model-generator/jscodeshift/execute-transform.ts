import { run } from 'jscodeshift/src/Runner';

interface IOptions {
	transformPath: string;
	filePath: string;
}

export const executeTransform = async ({
	filePath,
	transformPath,
}: IOptions) => {
	await run(transformPath, [filePath], {
		dry: false,
		print: false,
		verbose: 1,
	});
};
