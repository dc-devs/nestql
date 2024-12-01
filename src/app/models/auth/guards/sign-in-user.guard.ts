import { AuthService } from '@models/auth/auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';
import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class SignInUser implements CanActivate {
	constructor(private authService: AuthService) {}

	async canActivate(executionContext: ExecutionContext) {
		try {
			const ctx = GqlExecutionContext.create(executionContext);
			const context = ctx.getContext();
			const { req: request } = context;

			const user = await this.authService.signIn(request);

			if (!user) {
				throw new UnauthorizedException();
			}

			return !!user;
		} catch (e) {
			throw new UnauthorizedException();
		}
	}
}
