import { Domain } from '@base/server/enums';
import { getAppDomain } from '@base/common/utils/get-app-domain';

export const getCookieDomain = () => {
	let appDomain = getAppDomain();

	if (!appDomain.includes(Domain.Default)) {
		appDomain = `local${appDomain}`;
	}

	return appDomain;
};
