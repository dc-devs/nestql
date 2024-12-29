import { Module } from '@nestjs/common';
import { AuthService } from '@models/auth/auth.service';
import { AuthResolver } from '@models/auth/auth.resolver';
import { UsersService } from '@models/users/users.service';
import { PrismaService } from '@root/src/base/services/prisma/service/prisma.service';

@Module({
	imports: [],
	providers: [AuthResolver, AuthService, UsersService, PrismaService],
	exports: [AuthService],
})
export class AuthModule {}
