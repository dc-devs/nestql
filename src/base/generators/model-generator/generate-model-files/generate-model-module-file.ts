import { join } from 'path';
import { plural } from 'pluralize';
import { kebabCase } from 'change-case';
import { writeFile } from 'fs/promises';

interface IOptions {
	basePath: string;
	modelName: string;
}

export const generateModelModuleFile = async ({
	basePath,
	modelName,
}: IOptions) => {
	const modelNamePascalPluralized = plural(modelName);
	const modelNameLowerKebabCasePluralized = kebabCase(
		modelNamePascalPluralized,
	);
	const filePath = join(
		basePath,
		`${modelNameLowerKebabCasePluralized}.module.ts`,
	);
	const fileContent = `import { Module } from '@nestjs/common';
import { ${modelNamePascalPluralized}Service } from '@models/${modelNameLowerKebabCasePluralized}/${modelNameLowerKebabCasePluralized}.service';
import { ${modelNamePascalPluralized}Resolver } from '@models/${modelNameLowerKebabCasePluralized}/${modelNameLowerKebabCasePluralized}.resolver';
import { PrismaService } from '@base/services/prisma/service/prisma.service';

@Module({
	providers: [${modelNamePascalPluralized}Resolver, ${modelNamePascalPluralized}Service, PrismaService],
	exports: [${modelNamePascalPluralized}Service],
})
export class ${modelNamePascalPluralized}Module {}
`;

	await writeFile(filePath, fileContent);
};
