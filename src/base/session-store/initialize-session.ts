import { v4 as uuidv4 } from 'uuid';
import { RedisStore } from 'connect-redis';
import session from 'express-session';
import { Cookie } from '@base/session-store/common/enums';
import { sixtyDays } from '@base/common/constants/time-in-ms';
import { SessionSecret } from '@base/session-store/common/constants';
import { initializeRedis } from '@base/session-store/initialize-redis';
import { getAppDomain } from '@base/common/utils/get-app-domain';

export const initializeSession = async () => {
	console.log('[SessionStore] Initializing session store');
	const redisClient = await initializeRedis();
	const appDomain = getAppDomain();

	console.log('[SessionStore] App domain:', appDomain);
	console.log('[SessionStore] Cookie name:', Cookie.Name);
	console.log('[SessionStore] Session secret exists:', !!SessionSecret);

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
			console.log('[SessionStore] Generated session ID:', id);
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

	console.log('[SessionStore] Session config:', {
		cookieName: sessionConfig.name,
		domain: sessionConfig.cookie.domain,
		secure: sessionConfig.cookie.secure,
		httpOnly: sessionConfig.cookie.httpOnly,
		maxAge: sessionConfig.cookie.maxAge,
		sameSite: sessionConfig.cookie.sameSite,
	});

	const sessionMiddleware = session(sessionConfig);
	console.log('[SessionStore] Session middleware created successfully');

	return sessionMiddleware;
};
