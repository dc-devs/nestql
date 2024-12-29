import { expect, test, describe, beforeEach } from 'bun:test';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from '@models/users/users.resolver';
import { UsersService } from '@models/users/users.service';
import { PrismaService } from '@root/src/base/services/prisma/service/prisma.service';

describe('UsersResolver', () => {
	let resolver: UsersResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PrismaService, UsersResolver, UsersService],
		}).compile();

		resolver = module.get<UsersResolver>(UsersResolver);
	});

	test('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
