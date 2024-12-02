import { GqlExecutionContext } from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';
import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { SessionInput } from '@models/auth/dto/inputs';
import { UserSafe } from '@models/users/common/entities/user-safe';
import { PrismaService } from '@base/services/prisma/prisma.service';

interface IValidateUser extends SessionInput {
	prisma: PrismaService;
}

const validateUser = async ({ email, password, prisma }: IValidateUser) => {
	try {
		const user = await prisma.user.findUnique({
			where: { email },
		});
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

			const user = await validateUser({
				...sessionInput,
				prisma: this.prisma,
			});

			request.user = user;

			return !!user;
		} catch (e) {
			throw new UnauthorizedException();
		}
	}
}
