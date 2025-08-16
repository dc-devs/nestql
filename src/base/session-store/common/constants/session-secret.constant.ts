export const SessionSecret = (Bun.env.SESSION_SECRET ??
	process.env.SESSION_SECRET)!;
