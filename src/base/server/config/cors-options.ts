import { Host } from '@base/server/enums';
import { getFrontendDomain } from '@base/common/utils/get-frontend-domain';

const frontendDomain = getFrontendDomain();

export const corsOptions = {
	origin: [
		Host.LocalServer,
		Host.LocalhostServer,
		Host.LocalhostTestServer,
		Host.ApolloStudioSandbox,
		`https://${frontendDomain}`,
		`https://local.${frontendDomain}`,
		`https://api.${frontendDomain}`,
	].filter(Boolean),
	credentials: true,
	exposedHeaders: ['Set-Cookie'],
};
