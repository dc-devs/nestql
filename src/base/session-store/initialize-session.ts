import { v4 as uuidv4 } from 'uuid';
import { RedisStore } from 'connect-redis';
import session from 'express-session';
import { Cookie } from '@base/session-store/common/enums';
import { sixtyDays } from '@base/common/constants/time-in-ms';
import { SessionSecret } from '@base/session-store/common/constants';
import { initializeRedis } from '@base/session-store/initialize-redis';

export const initializeSession = async () => {
	const redisClient = await initializeRedis();
	const appDomain = Bun.env.APP_DOMAIN ?? process.env.APP_DOMAIN;

	const sessionConfig = {
		store: new RedisStore({ client: redisClient }),
		name: Cookie.Name,
		resave: false,
		saveUninitialized: false,
		secret: SessionSecret,
		genid: () => {
			return uuidv4();
		},
		cookie: {
			secure: true,
			httpOnly: true,
			domain: appDomain ?? Cookie.DomainDefault,
			maxAge: sixtyDays,
			sameSite: 'none',
		},
	};

	return session(sessionConfig);
};
