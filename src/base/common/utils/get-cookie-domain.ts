import { Cookie } from '@base/session-store/common/enums';
import { getAppDomain } from '@base/common/utils/get-app-domain';

export const getCookieDomain = () => {
	const appDomain = getAppDomain();

	return appDomain ?? Cookie.DomainDefault;
};
