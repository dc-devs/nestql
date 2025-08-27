import { v4 as uuidv4 } from 'uuid';
import { RedisStore } from 'connect-redis';
import session from 'express-session';
import { Cookie } from '@base/session-store/common/enums';
import { sixtyDays } from '@base/common/constants/time-in-ms';
import { SessionSecret } from '@base/session-store/common/constants';
import { initializeRedis } from '@base/session-store/initialize-redis';
import { getAppDomain } from '@base/common/utils/get-app-domain';

export const initializeSession = async () => {
	const redisClient = await initializeRedis();
	const appDomain = getAppDomain();

	const sessionConfig = {
		store: new RedisStore({
			client: redisClient,
			ttl: Math.floor(sixtyDays / 1000), // Convert to seconds, match cookie TTL
		}),
		name: Cookie.Name,
		resave: false,
		saveUninitialized: false,
		secret: SessionSecret,
		genid: () => {
			const id = uuidv4();

			return id;
		},
		cookie: {
			secure: true,
			httpOnly: true,
			domain: appDomain,
			maxAge: sixtyDays,
			sameSite: 'none',
		},
	};

	return session(sessionConfig);
};
