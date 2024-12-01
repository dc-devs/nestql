import { Injectable } from '@nestjs/common';
import { User } from '@generated/user/user.model';
import { SessionInput } from '@models/auth/dto/inputs';
import { UnauthorizedException } from '@nestjs/common';
import { Cookie } from '@base/session-store/common/enums';
import { UserSafe } from '@models/users/common/entities/user-safe';
import { PrismaService } from '@base/services/prisma/prisma.service';

interface ISignInRequest {
	user?: User;
	session?: any;
	sessionStore?: any;
}

interface ILoginResponse {
	cookie?: any;
}

interface ILogOutProps {
	userId: number;
	request: ISignInRequest;
	response: ILoginResponse;
}

@Injectable()
export class AuthService {
	constructor(protected readonly prisma: PrismaService) {}

	async validateUser({ email, password }: SessionInput) {
		try {
			const user = await this.prisma.user.findFirst({
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
			}

			return validatedUser;
		} catch (e) {
			throw new UnauthorizedException();
		}
	}

	async signIn(request: ISignInRequest) {
		const { user } = request;

		if (user && request.session) {
			request.session.userId = user.id;
		} else {
			throw new UnauthorizedException();
		}

		return user;
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

		return true;
	}
}
