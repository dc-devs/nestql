import { expect, test, describe, beforeEach } from 'bun:test';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@models/auth/auth.service';
import { AuthResolver } from '@models/auth/auth.resolver';
import { UsersModule } from '@models/users/users.module';
import { PrismaService } from '@base/services/prisma/prisma.service';

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
