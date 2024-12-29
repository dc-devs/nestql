import { resolve } from 'path';

export const baseDirectory = resolve(
	process.cwd(),
	'src/app/models/common/@generated',
);
