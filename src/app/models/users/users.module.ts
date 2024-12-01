import { Module } from '@nestjs/common';
import { UsersService } from '@models/users/users.service';
import { UsersResolver } from '@models/users/users.resolver';
import { PrismaService } from '@base/services/prisma/prisma.service';

@Module({
	providers: [UsersResolver, UsersService, PrismaService],
	exports: [UsersService],
})
export class UsersModule {}
