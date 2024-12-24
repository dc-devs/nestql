import { plural } from 'pluralize';
import { kebabCase } from 'change-case';
import path from 'path';
import { writeFile } from 'fs/promises';

interface IOptions {
	basePath: string;
	modelName: string;
}

export const generateModelResolverFile = async ({
	basePath,
	modelName,
}: IOptions) => {
	const modelNamePascalPluralized = plural(modelName);
	const modelNameLowerKebabCaseSingular = kebabCase(modelName);
	const modelNameLowerKebabCasePluralized = kebabCase(
		modelNamePascalPluralized,
	);
	const filePath = path.join(
		basePath,
		`${modelNameLowerKebabCasePluralized}.resolver.ts`,
	);
	const fileContent = `import { Resolver } from '@nestjs/graphql';
import { BasePrismaResolver } from '@base/app/resolver/base-prisma-resolver';
import { ${modelNamePascalPluralized}Service } from '@models/${modelNameLowerKebabCasePluralized}/${modelNameLowerKebabCasePluralized}.service';
import { ${modelName} } from '@generated/${modelNameLowerKebabCaseSingular}/${modelNameLowerKebabCaseSingular}.model';
import { ${modelName}UpdateInput } from '@generated/${modelNameLowerKebabCaseSingular}/${modelNameLowerKebabCaseSingular}-update.input';
import { ${modelName}CreateInput } from '@generated/${modelNameLowerKebabCaseSingular}/${modelNameLowerKebabCaseSingular}-create.input';
import { FindMany${modelName}Args } from '@generated/${modelNameLowerKebabCaseSingular}/find-many-${modelNameLowerKebabCaseSingular}.args';
import { FindFirst${modelName}Args } from '@generated/${modelNameLowerKebabCaseSingular}/find-first-${modelNameLowerKebabCaseSingular}.args';
import { DeleteOne${modelName}Args } from '@generated/${modelNameLowerKebabCaseSingular}/delete-one-${modelNameLowerKebabCaseSingular}.args';
import { FindUnique${modelName}Args } from '@generated/${modelNameLowerKebabCaseSingular}/find-unique-${modelNameLowerKebabCaseSingular}.args';
import { CreateMany${modelName}Args } from '@generated/${modelNameLowerKebabCaseSingular}/create-many-${modelNameLowerKebabCaseSingular}.args';
import { UpdateMany${modelName}Args } from '@generated/${modelNameLowerKebabCaseSingular}/update-many-${modelNameLowerKebabCaseSingular}.args';
import { ${modelName}WhereUniqueInput } from '@generated/${modelNameLowerKebabCaseSingular}/${modelNameLowerKebabCaseSingular}-where-unique.input';

@Resolver(() => ${modelName})
export class ${modelNamePascalPluralized}Resolver extends BasePrismaResolver<
	${modelName},
	${modelName}WhereUniqueInput,
	FindUnique${modelName}Args,
	FindFirst${modelName}Args,
	FindMany${modelName}Args,
	${modelName}CreateInput,
	CreateMany${modelName}Args,
	${modelName}UpdateInput,
	UpdateMany${modelName}Args,
	DeleteOne${modelName}Args
>({
	entity: ${modelName},
	whereUniqueInput: ${modelName}WhereUniqueInput,
	findUniqueArgs: FindUnique${modelName}Args,
	findFirstArgs: FindFirst${modelName}Args,
	findManyArgs: FindMany${modelName}Args,
	createOneInput: ${modelName}CreateInput,
	createManyArgs: CreateMany${modelName}Args,
	updateOneInput: ${modelName}UpdateInput,
	updateManyArgs: UpdateMany${modelName}Args,
	deleteOneArgs: DeleteOne${modelName}Args,
}) {
	constructor(protected readonly service: ${modelNamePascalPluralized}Service) {
		super({ baseService: service });
	}
}
`;

	await writeFile(filePath, fileContent);
};
