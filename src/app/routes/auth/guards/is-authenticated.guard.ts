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

			// Check if session cookie exists before accessing request.session
			// This prevents accidental session creation
			if (!request.headers.cookie?.includes(Cookie.Name)) {
				throw new UnauthorizedException('No session found');
			}

			const id = request.session.userId;

			const user = await this.prisma.user.findUnique({
				where: { id },
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
