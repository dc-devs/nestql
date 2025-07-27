import { Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { SessionInput } from '@routes/auth/dto/inputs';
import { AuthService } from '@routes/auth/auth.service';
import { UserCreateInput } from '@generated/user/user-create.input';
import { SessionResponse, LogOutResponse } from '@routes/auth/dto/models';
import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { IsValidUser, IsAuthenticated } from '@routes/auth/guards';

@Resolver()
export class AuthResolver {
	constructor(protected readonly authService: AuthService) {}

	@Mutation(() => SessionResponse)
	async signUp(
		@Context('req') request: Request,
		@Args('data') userCreateInput: UserCreateInput,
	) {
		return await this.authService.signUp({ request, userCreateInput });
	}

	@Mutation(() => LogOutResponse)
	signOut(
		@Context('res') response,
		@Context('req') request,
		@Args('userId') userId: string,
	) {
		return this.authService.signOut({ request, response, userId });
	}

	@Mutation(() => SessionResponse)
	@UseGuards(IsValidUser)
	async signIn(
		@Context('req') request: Request,
		@Args('sessionInput') _sessionInput: SessionInput,
	) {
		return this.authService.signIn({ request });
	}

	@Query(() => SessionResponse)
	@UseGuards(IsAuthenticated)
	async getAuthSession(@Context('req') request: Request) {
		return this.authService.getAuthSession({ request });
	}
}
