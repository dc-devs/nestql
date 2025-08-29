import { PrismaClient } from '@prisma/client';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { SessionInput } from '@routes/auth/dto/inputs';
import type { UserSafe } from '@models/users/common/entities/user-safe';
import { PrismaService } from '@root/src/base/services/prisma/service/prisma.service';

const validateUser = async ({ email, password }: SessionInput) => {
	console.log('[validateUser] Starting user validation');
	console.log('[validateUser] Email:', email);
	console.log('[validateUser] Password length:', password?.length);

	try {
		// Create a temporary prisma client instance without the password omit
		const tempPrisma = new PrismaClient({
			log: [
				{ level: 'query', emit: 'event' },
				{ level: 'info', emit: 'stdout' },
				{ level: 'warn', emit: 'stdout' },
				{ level: 'error', emit: 'stdout' },
			],
		});
		tempPrisma.$on('query', (e) => {
			try {
				const limitedParams =
					e.params?.length > 256
						? e.params.slice(0, 256) + '…'
						: e.params;
				console.log(
					'[PrismaGuard][query]',
					e.query,
					limitedParams,
					`${e.duration}ms`,
				);
			} catch {}
		});

		console.log('[validateUser] Searching for user by email:', email);

		// Get full user data including password
		const user = await tempPrisma.user.findUnique({
			where: { email },
		});

		console.log('[validateUser] User found:', !!user);
		if (user) {
			console.log('[validateUser] User id:', user.id);
			console.log('[validateUser] User email:', user.email);
		}

		// Disconnect the temporary client
		await tempPrisma.$disconnect();

		let validatedUser: UserSafe | null = null;

		if (user) {
			console.log('[validateUser] Verifying password');
			const hasCorrectPassword = await Bun.password.verify(
				password,
				user.password,
			);

			console.log('[validateUser] Password valid:', hasCorrectPassword);

			if (user && hasCorrectPassword) {
				const { password, ...restOfUserData } = user;
				validatedUser = restOfUserData;
				console.log('[validateUser] User validation successful');
				console.log(
					'[validateUser] Validated user id:',
					validatedUser.id,
				);
			} else {
				console.log('[validateUser] Password verification failed');
			}
		} else {
			console.log(
				'[validateUser] User not found, throwing UnauthorizedException',
			);
			throw new UnauthorizedException();
		}

		console.log(
			'[validateUser] Returning validated user:',
			!!validatedUser,
		);
		return validatedUser;
	} catch (e) {
		console.error('[validateUser] Validation error:', e);
		console.error('[validateUser] Error stack:', e.stack);
		throw new UnauthorizedException();
	}
};

@Injectable()
export class IsValidUser implements CanActivate {
	constructor(private prisma: PrismaService) {}

	async canActivate(executionContext: ExecutionContext) {
		console.log('[IsValidUser] Starting canActivate');
		try {
			const ctx = GqlExecutionContext.create(executionContext);
			const context = ctx.getContext();
			const { req: request } = context;
			const { sessionInput } = ctx.getArgs();

			console.log('[IsValidUser] Session input:', sessionInput);
			console.log(
				'[IsValidUser] Request session before validation:',
				request.session,
			);

			const user = await validateUser(sessionInput);

			console.log('[IsValidUser] User validation result:', !!user);
			if (user) {
				console.log('[IsValidUser] Validated user id:', user.id);
			}

			request.user = user;
			console.log('[IsValidUser] User attached to request');

			return !!user;
		} catch (e) {
			console.error('[IsValidUser] Guard activation error:', e);
			console.error('[IsValidUser] Error stack:', e.stack);
			throw new UnauthorizedException();
		}
	}
}
