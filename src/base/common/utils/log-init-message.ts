import { Logger } from '@nestjs/common';

interface IOptions {
	port: string | number;
	environment: string;
	redisUri: string | undefined;
	databaseUri: string | undefined;
}

export const logInitMessage = ({
	port,
	redisUri,
	environment,
	databaseUri,
}: IOptions) => {
	const logger = new Logger('NestApplication');

	console.log('');
	console.log('');
	logger.log(`Port: ${port}`);
	logger.log(`Environment: ${environment}`);
	logger.log('');
	logger.log(`Redis: ${redisUri}`);
	logger.log(`Database: ${databaseUri}`);
	console.log('');
};
