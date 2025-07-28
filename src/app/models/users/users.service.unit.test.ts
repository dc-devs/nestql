import { describe, expect, beforeEach, test } from 'bun:test';
import { Test, type TestingModule } from '@nestjs/testing';
import { UsersService } from '@models/users/users.service';
import { PrismaService } from '@root/src/base/services/prisma/service/prisma.service';

describe('UsersService', () => {
	let service: UsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PrismaService, UsersService],
		}).compile();

		service = module.get<UsersService>(UsersService);
	});

	test('should be defined', () => {
		expect(service).toBeDefined();
	});
});
