import { resolve } from 'path';
import { File } from '@base/generators/common/enums';

export const filePaths = {
	[File.AppModule]: resolve(process.cwd(), 'src/app/app.module.ts'),
};
