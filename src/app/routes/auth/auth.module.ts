import { Module } from '@nestjs/common';
import { AuthService } from '@routes/auth/auth.service';
import { AuthResolver } from '@routes/auth/auth.resolver';
import { UsersService } from '@models/users/users.service';
import { IsValidUser, IsAuthenticated } from '@routes/auth/guards';
import { PrismaService } from '@root/src/base/services/prisma/service/prisma.service';

@Module({
	imports: [],
	providers: [
		AuthResolver,
		AuthService,
		UsersService,
		PrismaService,
		IsValidUser,
		IsAuthenticated,
	],
	exports: [AuthService, IsValidUser, IsAuthenticated],
})
export class AuthModule {}
