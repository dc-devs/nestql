import { createClient, type RedisClientType } from 'redis';
import { Logger } from '@nestjs/common';
import { isDevelopmentEnv } from '@base/common/constants';

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

		redisClient.on('ready', async () => {
			logger.log('ready');
			console.log('');

			// Enable keyspace notifications for session monitoring
			try {
				await redisClient.configSet('notify-keyspace-events', 'KEA');
				logger.debug('Keyspace notifications enabled');

				// Create a separate client for subscribing to events
				const subscriberClient = redisClient.duplicate();
				await subscriberClient.connect();

				// Subscribe to session-related events
				// Sessions typically use keys like 'sess:sessionId'
				await subscriberClient.pSubscribe(
					'__keyspace@0__:sess:*',
					(message, channel) => {
						const operation = channel.split(':').pop(); // get the operation type
						const sessionKey = message; // the key that was modified

						if (isDevelopmentEnv) {
							logger.debug(
								`Session event: ${operation} on ${sessionKey}`,
							);
						} else {
							logger.debug(`Session event: ${operation}`);
						}
					},
				);

				// Also listen for key expiration events (session timeouts)
				await subscriberClient.pSubscribe(
					'__keyevent@0__:expired',
					(message, channel) => {
						if (message.startsWith('sess:')) {
							if (isDevelopmentEnv) {
								logger.debug(`Session expired: ${message}`);
							} else {
								logger.debug('Session expired');
							}
						}
					},
				);

				logger.debug('Subscribed to Redis session events');
			} catch (error) {
				logger.warn('Failed to set up Redis event monitoring:', error);
			}

			connectedRedisClient = redisClient;
			resolve(redisClient);
		});

		await redisClient.connect();
	});
};

export { connectedRedisClient, initializeRedis };
