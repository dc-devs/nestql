import { Environment } from '@base/common/enums';

export const environment =
	(Bun.env.NODE_ENV ?? process.env.NODE_ENV) || Environment.DEVELOPMENT;

export const isTestEnv = environment === Environment.TEST;

export const isProductionEnv = environment === Environment.PRODUCTION;

export const isDevelopmentEnv = environment === Environment.DEVELOPMENT;
