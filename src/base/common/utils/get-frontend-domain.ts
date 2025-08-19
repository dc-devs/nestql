import { getAppDomain } from '@base/common/utils/get-app-domain';

export const getFrontendDomain = () => {
	const appDomain = getAppDomain();

	return appDomain.startsWith('.') ? appDomain.slice(1) : appDomain;
};
