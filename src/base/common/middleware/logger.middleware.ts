import { Logger, Injectable } from '@nestjs/common';
import type { NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(request: Request, response: Response, next: NextFunction) {
		const { method, url } = request;
		const logger = new Logger('Middleware');

		logger.log(`[Log] ${method} ${url}`);

		next();
	}
}
