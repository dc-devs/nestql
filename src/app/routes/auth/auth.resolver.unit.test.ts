import { expect, test, describe, beforeEach } from 'bun:test';
import { AuthService } from '@routes/auth/auth.service';
import { AuthResolver } from '@routes/auth/auth.resolver';
import { UsersModule } from '@models/users/users.module';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@root/src/base/services/prisma/service/prisma.service';

describe('AuthResolver', () => {
	let resolver: AuthResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [UsersModule],
			providers: [AuthResolver, AuthService, PrismaService],
		}).compile();

		resolver = module.get<AuthResolver>(AuthResolver);
	});

	test('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
