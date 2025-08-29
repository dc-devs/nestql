import { GqlExecutionContext } from '@nestjs/graphql';
import { Cookie } from '@base/session-store/common/enums';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { PrismaService } from '@root/src/base/services/prisma/service/prisma.service';
import type { CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class IsAuthenticated implements CanActivate {
	constructor(private prisma: PrismaService) {}

	async canActivate(context: ExecutionContext) {
		try {
			const ctx = GqlExecutionContext.create(context);
			const request = ctx.getContext().req;

			console.log('[IsAuthenticated] Starting authentication check');
			console.log('[IsAuthenticated] Request headers:', request.headers);
			console.log(
				'[IsAuthenticated] Cookie header:',
				request.headers.cookie,
			);

			// Check if session cookie exists before accessing request.session
			// This prevents accidental session creation
			if (!request.headers.cookie?.includes(Cookie.Name)) {
				console.log(
					'[IsAuthenticated] No session cookie found, cookie name:',
					Cookie.Name,
				);
				throw new UnauthorizedException('No session found');
			}

			console.log(
				'[IsAuthenticated] Session cookie found, accessing session',
			);
			console.log(
				'[IsAuthenticated] Request session object:',
				request.session,
			);

			const id = request.session.userId;
			console.log('[IsAuthenticated] Session userId:', id);
			console.log('[IsAuthenticated] Session userId type:', typeof id);

			if (!id || id === undefined) {
				console.log(
					'[IsAuthenticated] No userId in session or userId is undefined',
				);
				throw new UnauthorizedException('No user ID in session');
			}

			console.log(
				'[IsAuthenticated] Attempting to find user with id:',
				id,
			);

			const user = await this.prisma.user.findUnique({
				where: { id },
			});

			console.log('[IsAuthenticated] User found:', !!user);
			if (user) {
				console.log('[IsAuthenticated] User details:', {
					id: user.id,
					email: user.email,
				});
			}

			if (!user) {
				console.log('[IsAuthenticated] User not found in database');
				throw new UnauthorizedException('User not found');
			}

			request.user = user;
			console.log('[IsAuthenticated] Authentication successful');

			return !!user;
		} catch (e) {
			console.error('[IsAuthenticated] Authentication error:', e);
			console.error('[IsAuthenticated] Error stack:', e.stack);
			throw new UnauthorizedException();
		}
	}
}
