import { GqlExecutionContext } from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@base/services/prisma/prisma.service';
import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class IsAuthenticated implements CanActivate {
	constructor(private prisma: PrismaService) {}

	async canActivate(context: ExecutionContext) {
		try {
			const ctx = GqlExecutionContext.create(context);
			const request = ctx.getContext().req;
			const id = request.session.userId;
			const user = await this.prisma.user.findFirst({ where: { id } });

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
