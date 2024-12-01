import { Host } from '@base/server/enums';

export const corsOptions = {
	origin: [Host.LocalhostServer, Host.LocalhostTestServer, Host.LocalServer],
	credentials: true,
	exposedHeaders: ['Set-Cookie'],
};
