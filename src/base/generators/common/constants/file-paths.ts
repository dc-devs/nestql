import { resolve } from 'path';
import { File } from '@base/generators/common/enums';

export const filePaths = {
	[File.AppModule]: resolve(process.cwd(), 'src/app/app.module.ts'),
	[File.SeedsIndex]: resolve(process.cwd(), 'prisma/seeds/index.ts'),
};
