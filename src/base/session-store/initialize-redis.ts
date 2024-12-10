import { createClient } from 'redis';
import { Logger } from '@nestjs/common';

let connectedRedisClient;

const redisClient = createClient({
	url: Bun.env.REDIS_URL,
});

const initializeRedis = async () => {
	const logger = new Logger('Redis');

	return new Promise(async (resolve, reject) => {
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

		await redisClient.connect();
	});
};

export { connectedRedisClient, initializeRedis };
