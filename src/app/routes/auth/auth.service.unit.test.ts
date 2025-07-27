import { expect, test, describe, beforeEach } from 'bun:test';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@routes/auth/auth.service';
import { AuthResolver } from '@routes/auth/auth.resolver';
import { UsersModule } from '@models/users/users.module';
import { PrismaService } from '@root/src/base/services/prisma/service/prisma.service';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [UsersModule],
			providers: [AuthResolver, AuthService, PrismaService],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	test('should be defined', () => {
		expect(service).toBeDefined();
	});
});
