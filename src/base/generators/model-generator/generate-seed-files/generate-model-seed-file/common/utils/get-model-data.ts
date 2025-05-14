interface IOptions {
	fieldsAndTypes: Record<string, string>;
}

const values = {
	String: 'Lorem ipsum',
	Int: 1,
	Boolean: true,
	Float: 1.1,
	DateTime: new Date().toISOString(),
	Json: {
		content: 'Lorem ipsum',
	},
};

export const getModelData = ({ fieldsAndTypes }: IOptions) => {
	const modelData = {};

	for (const field in fieldsAndTypes) {
		modelData[field] = values[fieldsAndTypes[field]];
	}

	return modelData;
};
