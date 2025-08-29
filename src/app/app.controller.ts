import { Controller, Get } from '@nestjs/common';
import { AppService } from '@src/app/app.service';
import { PrismaService } from '@root/src/base/services/prisma/service/prisma.service';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly prisma: PrismaService,
	) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Get('ping')
	ping(): string {
		return this.appService.getPong();
	}

	@Get('users')
	async getAllUsers() {
		console.log('[AppController] Getting all users from database');
		try {
			const users = await this.prisma.user.findMany({
				select: {
					id: true,
					email: true,
					role: true,
					createdAt: true,
					updatedAt: true,
					_count: {
						select: {
							chatSessions: true,
						},
					},
				},
				orderBy: {
					createdAt: 'desc',
				},
			});

			console.log('[AppController] Found users:', users.length);
			console.log('[AppController] Users:', users);

			return {
				success: true,
				count: users.length,
				users,
			};
		} catch (error) {
			console.error('[AppController] Error fetching users:', error);
			return {
				success: false,
				error: error.message,
				count: 0,
				users: [],
			};
		}
	}
}
