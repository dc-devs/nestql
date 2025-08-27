import { Logger, Injectable } from '@nestjs/common';
import type { NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(request: Request, response: Response, next: NextFunction) {
		const { method, headers } = request;
		const logger = new Logger('Middleware');

		const userAgent = headers['user-agent'];
		const isCurlUserAgent = userAgent?.includes('curl');
		const loggedUserAgent = isCurlUserAgent
			? 'curl'
			: userAgent || 'unknown';

		// Get the full URL information
		const requestUrl = request.originalUrl || request.url || '/';
		const queryString =
			request.query && Object.keys(request.query).length > 0
				? `?${new URLSearchParams(request.query as Record<string, string>).toString()}`
				: '';

		logger.log(
			`[Request] ${loggedUserAgent} ${method} ${requestUrl}${queryString}`,
		);

		next();
	}
}
