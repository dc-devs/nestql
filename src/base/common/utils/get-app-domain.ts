import { Domain } from '@base/server/enums';

export const getAppDomain = () => {
	const appDomain = Bun.env.APP_DOMAIN ?? process.env.APP_DOMAIN;

	return appDomain || Domain.Default;
};
