import { App } from '@base/common/enums';
import type { Type } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { logInitMessage } from '@base/common/utils';
import { initializeSession } from '@base/session-store';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { port, corsOptions, validationPipe } from '@base/server/config';
import { getAppDomain, getFrontendDomain } from '@base/common/utils';
import { environment } from '@base/common/constants/environment';

export async function bootstrap<AppModule>({
	AppModule,
}: {
	AppModule: Type<AppModule>;
}) {
	const appDomain = getAppDomain();
	const frontendDomain = getFrontendDomain();
	const session = await initializeSession();
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: ['verbose'],
	});

	app.use(session);
	app.enableShutdownHooks();
	app.enableCors(corsOptions);
	app.useGlobalPipes(validationPipe);
	app.set(App.TRUST_PROXY, true); // Always trust proxy in containerized environments

	// // Graceful shutdown on bun
	// process.on('SIGINT', async () => {
	// 	await app.close();
	// 	process.exit(0);
	// });

	await app.listen(port);

	logInitMessage({
		port,
		environment,
		appDomain,
		frontendDomain,
		redisUrl: process.env.REDIS_URL!,
		databaseUrl: process.env.DATABASE_URL!,
		mastraDatabaseUrl: process.env.MASTRA_DATABASE_URL!,
	});
}
