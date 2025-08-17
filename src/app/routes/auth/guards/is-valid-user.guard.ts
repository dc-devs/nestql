import { PrismaClient } from '@prisma/client';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { SessionInput } from '@routes/auth/dto/inputs';
import type { UserSafe } from '@models/users/common/entities/user-safe';
import { PrismaService } from '@root/src/base/services/prisma/service/prisma.service';

const validateUser = async ({ email, password }: SessionInput) => {
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

		// Get full user data including password
		const user = await tempPrisma.user.findUnique({
			where: { email },
		});

		// Disconnect the temporary client
		await tempPrisma.$disconnect();

		let validatedUser: UserSafe | null = null;

		if (user) {
			const hasCorrectPassword = await Bun.password.verify(
				password,
				user.password,
			);

			if (user && hasCorrectPassword) {
				const { password, ...restOfUserData } = user;
				validatedUser = restOfUserData;
			}
		} else {
			throw new UnauthorizedException();
		}

		return validatedUser;
	} catch (e) {
		throw new UnauthorizedException();
	}
};

@Injectable()
export class IsValidUser implements CanActivate {
	constructor(private prisma: PrismaService) {}

	async canActivate(executionContext: ExecutionContext) {
		try {
			const ctx = GqlExecutionContext.create(executionContext);
			const context = ctx.getContext();
			const { req: request } = context;
			const { sessionInput } = ctx.getArgs();
			const user = await validateUser(sessionInput);

			request.user = user;

			return !!user;
		} catch (e) {
			throw new UnauthorizedException();
		}
	}
}
