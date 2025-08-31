import { Domain } from '@base/server/enums';

export const getAppDomain = (): string => {
	const appDomain = process.env.APP_DOMAIN;
	const domain = appDomain || Domain.Default;

	// Ensure domain starts with '.' for cookie domain
	return domain.startsWith('.') ? domain : `.${domain}`;
};
