export const SessionSecret = (process.env.SESSION_SECRET ??
	process.env.SESSION_SECRET) || 'default-session-secret-change-in-production';
