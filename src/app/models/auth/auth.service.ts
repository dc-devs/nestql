import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { Cookie } from '@base/session-store/common/enums';
import { UsersService } from '@models/users/users.service';
import { UserCreateInput } from '@generated/user/user-create.input';
import { PrismaService } from '@root/src/base/services/prisma/service/prisma.service';
import {
	ILogOutProps,
	IAuthenticatedRequest,
} from '@models/auth/common/interfaces';

@Injectable()
export class AuthService {
	constructor(
		protected readonly prisma: PrismaService,
		protected readonly usersService: UsersService,
	) {}

	async signUp({
		request,
		userCreateInput,
	}: {
		request: IAuthenticatedRequest;
		userCreateInput: UserCreateInput;
	}) {
		const user = await this.usersService.create(userCreateInput);

		request.user = user;

		return await this.signIn({ request });
	}

	async signIn({ request }: { request: IAuthenticatedRequest }) {
		const { user } = request;

		if (user && request.session) {
			request.session.userId = user.id;
		} else {
			throw new UnauthorizedException();
		}

		return { isAuthenticated: true, user };
	}

	signOut({ request, response, userId }: ILogOutProps) {
		request.session.userId = undefined;

		response.cookie(Cookie.Name, null, {
			secure: true,
			httpOnly: true,
			domain: Cookie.Domain,
			expires: new Date(Cookie.ExpireDate),
			sameSite: 'none',
		});

		request.session.destroy();
		request.sessionStore.destroy(userId);

		return { isAuthenticated: false, userId };
	}

	getCurrentUserResponse({ request }: { request: IAuthenticatedRequest }) {
		const { user } = request;

		return { isAuthenticated: true, user };
	}
}
