import { expect, test, describe, beforeEach } from 'bun:test';
import { AuthService } from '@models/auth/auth.service';
import { AuthResolver } from '@models/auth/auth.resolver';
import { UsersModule } from '@models/users/users.module';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuthResolver', () => {
	let resolver: AuthResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [UsersModule],
			providers: [AuthResolver, AuthService],
		}).compile();

		resolver = module.get<AuthResolver>(AuthResolver);
	});

	test('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
