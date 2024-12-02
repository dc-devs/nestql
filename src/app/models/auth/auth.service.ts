import { Injectable } from '@nestjs/common';
import { User } from '@generated/user/user.model';
import { UnauthorizedException } from '@nestjs/common';
import { Cookie } from '@base/session-store/common/enums';
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
