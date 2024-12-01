import { Module } from '@nestjs/common';
import { AuthService } from '@models/auth/auth.service';
import { AuthResolver } from '@models/auth/auth.resolver';
import { PrismaService } from '@base/services/prisma/prisma.service';

@Module({
	imports: [],
	providers: [AuthResolver, AuthService, PrismaService],
	exports: [AuthService],
})
export class AuthModule {}
