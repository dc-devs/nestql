import { getDMMF } from '@prisma/internals';
import type { DMMF } from '@prisma/generator-helper';
import { readFile } from 'fs/promises';

interface IOptions {
	modelName?: string;
}

export const getPrismaModel = async ({ modelName }: IOptions = {}): Promise<
	DMMF.Model | DMMF.Model[] | null
> => {
	let parsedPrismaSchema: DMMF.Model | DMMF.Model[] | null = null;
	const schemaContent = await readFile('./prisma/schema.prisma', 'utf8');
	const dmmf = await getDMMF({
		datamodel: schemaContent,
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
