import { Logger } from '@nestjs/common';

interface IOptions {
	port: string | number;
	environment: string;
	appDomain: string;
	redisUrl: string | undefined;
	databaseUrl: string | undefined;
	mastraDatabaseUrl: string | undefined;
}

const maskConnectionString = (url: string | undefined): string => {
	if (!url) return 'undefined';

	try {
		const parsed = new URL(url);
		// Mask password but keep useful info for debugging
		const maskedPassword = parsed.password ? '<masked>' : '';
		const userInfo = parsed.username
			? `${parsed.username}${maskedPassword ? ':' + maskedPassword : ''}`
			: '';

		return `${parsed.protocol}//${userInfo ? userInfo + '@' : ''}${parsed.hostname}${parsed.port ? ':' + parsed.port : ''}${parsed.pathname}${parsed.search}`;
	} catch {
		return '<invalid-url>';
	}
};

const getConnectionSummary = (url: string | undefined): string => {
	if (!url) return 'not configured';

	try {
		const parsed = new URL(url);
		return `${parsed.protocol}//${parsed.hostname}:${parsed.port || (parsed.protocol === 'redis:' ? '6379' : '5432')}/${parsed.pathname.replace(/^\//, '') || 'default'}`;
	} catch {
		return 'invalid configuration';
	}
};

export const logInitMessage = ({
	port,
	redisUrl,
	appDomain,
	environment,
	databaseUrl,
	mastraDatabaseUrl,
}: IOptions) => {
	const logger = new Logger('NestApplication');
	const isProduction = environment === 'production';

	console.log('');
	console.log('');
	logger.log(`Application starting`);
	logger.log(`Environment: ${environment}`);
	logger.log(`Port: ${port}`);
	logger.log(`App Domain: ${appDomain}`);
	logger.log('');

	if (isProduction) {
		// Production: Log connection summaries without credentials
		logger.log(`Redis: ${getConnectionSummary(redisUrl)}`);
		logger.log(`Database: ${getConnectionSummary(databaseUrl)}`);
		logger.log(`Mastra DB: ${getConnectionSummary(mastraDatabaseUrl)}`);
	} else {
		// Development: Log full URLs with masked passwords
		logger.log(`Redis: ${redisUrl || 'not configured'}`);
		logger.log(`Database: ${maskConnectionString(databaseUrl)}`);
		logger.log(`Mastra DB: ${maskConnectionString(mastraDatabaseUrl)}`);
	}

	// Always log important configuration flags
	logger.log('');
	logger.log(
		`SSL Mode: ${databaseUrl?.includes('sslmode=require') ? 'required' : 'optional'}`,
	);
	logger.log(
		`Prisma Env Loader: ${process.env.PRISMA_DISABLE_ENV_LOADER === '1' ? 'disabled' : 'enabled'}`,
	);

	console.log('');
};
