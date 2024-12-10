import { Logger } from '@nestjs/common';

interface IOptions {
	port: string | number;
	environment: string;
	redisUrl: string | undefined;
	databaseUrl: string | undefined;
}

export const logInitMessage = ({
	port,
	redisUrl,
	environment,
	databaseUrl,
}: IOptions) => {
	const logger = new Logger('NestApplication');

	console.log('');
	console.log('');
	logger.log(`Port: ${port}`);
	logger.log(`Environment: ${environment}`);
	logger.log('');
	logger.log(`Redis: ${redisUrl}`);
	logger.log(`Database: ${databaseUrl}`);
	console.log('');
};
