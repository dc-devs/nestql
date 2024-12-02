import { Module } from '@nestjs/common';
import { AuthService } from '@models/auth/auth.service';
import { AuthResolver } from '@models/auth/auth.resolver';
import { UsersService } from '@models/users/users.service';
import { PrismaService } from '@base/services/prisma/prisma.service';

@Module({
	imports: [],
	providers: [UsersService, AuthResolver, AuthService, PrismaService],
	exports: [AuthService],
})
export class AuthModule {}
