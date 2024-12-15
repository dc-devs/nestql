// @ts-nocheck TODO: fix this
import { getDMMF } from '@prisma/internals';

interface IOptions {
	modelName?: string;
}

export const getParsedPrismaSchema = async ({ modelName }: IOptions = {}) => {
	let parsedPrismaSchema = null;
	const dmmf = await getDMMF({
		datamodelPath: './prisma/schema.prisma',
	});

	// Access the parsed schema
	const models = dmmf.datamodel.models;

	if (modelName) {
		const model = models.find((model) => model.name === modelName);

		parsedPrismaSchema = model;
	} else {
		parsedPrismaSchema = models;
	}

	return parsedPrismaSchema;
};
