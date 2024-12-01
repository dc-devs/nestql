import { UseGuards } from '@nestjs/common';
import { AuthService } from '@models/auth/auth.service';
import { UserCreateInput } from '@generated/user/user-create.input';
import { PrismaService } from '@base/services/prisma/prisma.service';
import { SessionResponse, LogOutResponse } from '@models/auth/dto/models';
import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { SignInUser, IsValidUser, IsAuthenticated } from '@models/auth/guards';
// import generateGraphQLError from '@base/services/graphql/errors/generate-graphql-error';

@Resolver()
export class AuthResolver {
	constructor(
		protected readonly prisma: PrismaService,
		protected readonly authService: AuthService,
	) {}

	@Mutation(() => SessionResponse)
	async signUp(
		@Context('req') request,
		@Args('data')
		data: UserCreateInput,
	) {
		try {
			const newUser = await this.prisma.user.create({
				data: { ...data },
			});

			const loggedInUser = await this.authService.signIn({
				...request,
				user: { ...newUser },
			});

			return { isAuthenticated: true, user: loggedInUser };
		} catch (error) {
			console.error(error);
			// generateGraphQLError(error);
		}
	}

	@Mutation(() => LogOutResponse)
	signOut(
		@Context('res') response,
		@Context('req') request,
		@Args('userId') userId: number,
	) {
		try {
			this.authService.signOut({ request, response, userId });

			return { isAuthenticated: false, userId };
		} catch (error) {
			console.error(error);
			// generateGraphQLError(error);
		}
	}

	@Mutation(() => SessionResponse)
	@UseGuards(IsValidUser, SignInUser)
	async signIn(
		@Context('req') request,
	) {
		const { user } = request;

		return { isAuthenticated: true, user };
	}

	@Query(() => SessionResponse)
	@UseGuards(IsAuthenticated)
	async currentUser(@Context('req') request) {
		const { user } = request;

		return { isAuthenticated: true, user };
	}
}
