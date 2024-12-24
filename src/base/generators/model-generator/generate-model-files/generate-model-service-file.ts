import { plural } from 'pluralize';
import { kebabCase } from 'change-case';
import path from 'path';
import { writeFile } from 'fs/promises';

interface IOptions {
	basePath: string;
	modelName: string;
}

export const generateModelServiceFile = async ({
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
		`${modelNameLowerKebabCasePluralized}.service.ts`,
	);
	const fileContent = `import { Injectable } from '@nestjs/common';
import { modelName} from '@models/${modelNameLowerKebabCasePluralized}/common/constants';
import { PrismaService } from '@base/services/prisma/prisma.service';
import { BasePrismaService } from '@base/app/service/base-prisma-service';
import { ${modelName} } from '@generated/${modelNameLowerKebabCaseSingular}/${modelNameLowerKebabCaseSingular}.model';
import { ${modelName}UpdateInput } from '@generated/${modelNameLowerKebabCaseSingular}/${modelNameLowerKebabCaseSingular}-update.input';
import { ${modelName}CreateInput } from '@generated/${modelNameLowerKebabCaseSingular}/${modelNameLowerKebabCaseSingular}-create.input';
import { FindMany${modelName}Args } from '@generated/${modelNameLowerKebabCaseSingular}/find-many-${modelNameLowerKebabCaseSingular}.args';
import { DeleteOne${modelName}Args } from '@generated/${modelNameLowerKebabCaseSingular}/delete-one-${modelNameLowerKebabCaseSingular}.args';
import { FindFirst${modelName}Args } from '@generated/${modelNameLowerKebabCaseSingular}/find-first-${modelNameLowerKebabCaseSingular}.args';
import { CreateMany${modelName}Args } from '@generated/${modelNameLowerKebabCaseSingular}/create-many-${modelNameLowerKebabCaseSingular}.args';
import { FindUnique${modelName}Args } from '@generated/${modelNameLowerKebabCaseSingular}/find-unique-${modelNameLowerKebabCaseSingular}.args';
import { UpdateMany${modelName}Args } from '@generated/${modelNameLowerKebabCaseSingular}/update-many-${modelNameLowerKebabCaseSingular}.args';
import { ${modelName}WhereUniqueInput } from '@generated/${modelNameLowerKebabCaseSingular}/${modelNameLowerKebabCaseSingular}-where-unique.input';

@Injectable()
export class ${modelNamePascalPluralized}Service extends BasePrismaService<
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
> {
	constructor(protected prisma: PrismaService) {
		super({
			prisma,
			modelName,
		});
	}
}
`;

	await writeFile(filePath, fileContent);
};
