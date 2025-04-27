interface IOptions {
	modelData: Record<string, unknown>;
}

export const getStringifiedModelData = ({ modelData }: IOptions) => {
	let stringifiedModelData = `{\n`;

	Object.keys(modelData).forEach((key) => {
		const value = modelData[key];
		const valueString = typeof value === 'string' ? `'${value}'` : value;

		stringifiedModelData += `\t${key}: ${valueString},\n`;
	});

	stringifiedModelData += `}`;

	return stringifiedModelData;
};
