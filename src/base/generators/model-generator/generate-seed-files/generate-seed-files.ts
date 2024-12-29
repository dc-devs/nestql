interface IOptions {
	modelName: string;
}

export const generateSeedFiles = async ({ modelName }: IOptions) => {
	console.log('Generating seed files...', modelName);
};
