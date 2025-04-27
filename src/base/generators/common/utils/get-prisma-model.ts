import { getDMMF } from '@prisma/internals';
import { DMMF } from '@prisma/generator-helper';

interface IOptions {
	modelName?: string;
}

export const getPrismaModel = async ({ modelName }: IOptions = {}) => {
	let parsedPrismaSchema: DMMF.Model | DMMF.Model[] | null = null;
	const dmmf = await getDMMF({
		datamodelPath: './prisma/schema.prisma',
	});

	// Access the parsed schema
	const models = dmmf.datamodel.models;

	if (modelName) {
		const model = models.find((model) => model.name === modelName);

		parsedPrismaSchema = model as DMMF.Model;
	} else {
		parsedPrismaSchema = models as DMMF.Model[];
	}

	return parsedPrismaSchema;
};
