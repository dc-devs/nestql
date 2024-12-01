import { expect, test, describe, beforeEach } from 'bun:test';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@models/auth/auth.service';
import { AuthResolver } from '@models/auth/auth.resolver';
import { UsersModule } from '@models/users/users.module';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [UsersModule],
			providers: [AuthResolver, AuthService],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	test('should be defined', () => {
		expect(service).toBeDefined();
	});
});