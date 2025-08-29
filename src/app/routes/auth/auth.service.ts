import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { Cookie } from '@base/session-store/common/enums';
import { UsersService } from '@models/users/users.service';
import { UserCreateInput } from '@generated/user/user-create.input';
import { getAppDomain } from '@base/common/utils/get-app-domain';
import { hashPassword } from '@src/app/models/users/common/utils/hash-password';
import { PrismaService } from '@root/src/base/services/prisma/service/prisma.service';
import type {
	ILogOutProps,
	IAuthenticatedRequest,
} from '@routes/auth/common/interfaces';

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
		// Hash password
		userCreateInput.password = await hashPassword(userCreateInput.password);

		// Create user
		const user = await this.usersService.create(userCreateInput);

		// Set user in session
		request.user = user;

		return await this.signIn({ request });
	}

	async signIn({ request }: { request: IAuthenticatedRequest }) {
		console.log('[AuthService] Starting sign in process');
		const { user } = request;

		console.log('[AuthService] User from request:', user);
		console.log('[AuthService] User type:', typeof user);
		console.log(
			'[AuthService] Session before setting userId:',
			request.session,
		);

		try {
			if (user) {
				console.log(
					'[AuthService] Setting session userId to:',
					user.id,
				);
				request.session.userId = user.id;
				console.log(
					'[AuthService] Session after setting userId:',
					request.session,
				);
			} else {
				console.log(
					'[AuthService] No user found in request, throwing UnauthorizedException',
				);
				throw new UnauthorizedException();
			}
		} catch (e) {
			console.error('[AuthService] Error during sign in:', e);
			throw new UnauthorizedException();
		}

		console.log('[AuthService] Sign in successful, returning response');
		return { isAuthenticated: true, user };
	}

	signOut({ request, response, userId }: ILogOutProps) {
		request.session.userId = undefined;
		const appDomain = getAppDomain();

		response.cookie(Cookie.Name, null, {
			secure: true,
			httpOnly: true,
			domain: appDomain,
			expires: new Date(Cookie.ExpireDate),
			sameSite: 'none',
		});

		request.session.destroy();
		request.sessionStore.destroy(userId);

		return { isAuthenticated: false, userId };
	}

	getAuthSession({ request }: { request: IAuthenticatedRequest }) {
		console.log('[AuthService] Getting auth session');
		const { user } = request;

		console.log('[AuthService] User from request:', user);
		console.log('[AuthService] User type:', typeof user);
		console.log('[AuthService] Session data:', request.session);

		const result = { isAuthenticated: !!user, user };
		console.log('[AuthService] Returning auth session:', result);

		return result;
	}
}
