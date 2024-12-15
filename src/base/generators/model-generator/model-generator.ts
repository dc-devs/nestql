import { getCommandLineArgs } from '@base/generators/common/utils';

export const modelGenerator = () => {
	console.log('model-generator');

	const commandLineArgs = getCommandLineArgs();
	console.log('commandLineArgs', commandLineArgs);
};
