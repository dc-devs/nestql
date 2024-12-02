import { Host } from '@base/server/enums';

export const corsOptions = {
	origin: [
		Host.LocalServer,
		Host.LocalhostServer,
		Host.LocalhostTestServer,
		Host.ApolloStudioSandbox,
	],
	credentials: true,
	exposedHeaders: ['Set-Cookie'],
};
