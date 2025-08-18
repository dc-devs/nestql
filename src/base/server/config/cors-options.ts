import { Host } from '@base/server/enums';
import { getAppDomain } from '@base/common/utils';

const appDomain = getAppDomain();

export const corsOptions = {
	origin: [
		Host.LocalServer,
		Host.LocalhostServer,
		Host.LocalhostTestServer,
		Host.ApolloStudioSandbox,
		`https://${appDomain}`,
		`https://local.${appDomain}`,
		`https://api.${appDomain}`,
	],
	credentials: true,
	exposedHeaders: ['Set-Cookie'],
};
