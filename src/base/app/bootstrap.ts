import { App } from '@base/common/enums';
import { Type } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { logInitMessage } from '@base/common/utils';
import { initializeSession } from '@base/session-store';
import { NestExpressApplication } from '@nestjs/platform-express';
import { port, corsOptions, validationPipe } from '@base/server/config';
import {
	environment,
	isProductionEnv,
} from '@base/common/constants/environment';

export async function bootstrap<AppModule>({
	AppModule,
}: {
	AppModule: Type<AppModule>;
}) {
	const session = await initializeSession();
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: ['verbose'],
	});

	app.use(session);
	app.enableShutdownHooks();
	app.enableCors(corsOptions);
	app.useGlobalPipes(validationPipe);
	app.set(App.TRUST_PROXY, !isProductionEnv);

	// Graceful shutdown on bun
	process.on('SIGINT', async () => {
		await app.close();
		process.exit(0);
	});

	await app.listen(port);

	logInitMessage({
		port,
		environment,
		redisUri: process.env.REDIS_URI,
		databaseUri: process.env.DATABASE_URI,
	});
}
