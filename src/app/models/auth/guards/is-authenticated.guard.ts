import { GqlExecutionContext } from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';
import { select } from '@models/users/common/constants';
import { PrismaService } from '@root/src/base/services/prisma/service/prisma.service';
import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class IsAuthenticated implements CanActivate {
	constructor(private prisma: PrismaService) {}

	async canActivate(context: ExecutionContext) {
		try {
			const ctx = GqlExecutionContext.create(context);
			const request = ctx.getContext().req;
			const id = request.session.userId;

			const user = await this.prisma.user.findUnique({
				where: { id },
				select,
			});

			if (!user) {
				throw new UnauthorizedException();
			}

			request.user = user;

			return !!user;
		} catch (e) {
			throw new UnauthorizedException();
		}
	}
}
