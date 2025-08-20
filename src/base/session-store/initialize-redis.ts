import { createClient, type RedisClientType } from 'redis';
import { Logger } from '@nestjs/common';

type RedisClient = RedisClientType<any, any, any>;

let connectedRedisClient: RedisClient | undefined;

const redisClient: RedisClient = createClient({
	url: (Bun.env.REDIS_URL ?? process.env.REDIS_URL)!,
});

const initializeRedis = async (): Promise<RedisClient> => {
	const logger = new Logger('Redis');

	return new Promise<RedisClient>(async (resolve, reject) => {
		redisClient.on('error', (error) => {
			logger.error('Redis:', error);
			console.log('');

			reject(error);
		});

		redisClient.on('connect', () => {
			logger.log('connect');
		});

		redisClient.on('ready', () => {
			logger.log('ready');
			console.log('');

			connectedRedisClient = redisClient;
			resolve(redisClient);
		});

		logger.debug('Initializing Redis');

		await redisClient.connect();
	});
};

export { connectedRedisClient, initializeRedis };
