import { Port } from '@base/server/enums';
import { isTestEnv, isProductionEnv } from '@base/common/constants/environment';

export const testOrDevPort = isTestEnv ? Port.Test : Port.Development;

export const apppliccaionPort = isProductionEnv
	? Port.Production
	: testOrDevPort;

export const port = (Bun.env.PORT ?? process.env.PORT) || apppliccaionPort;
