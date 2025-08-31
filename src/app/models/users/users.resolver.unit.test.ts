import { Test } from '@nestjs/testing';
import type { TestingModule } from '@nestjs/testing';
import { UsersResolver } from '@src/app/models/users/users.resolver';
import { UsersService } from '@src/app/models/users/users.service';
import { PrismaService } from '@src/base/services/prisma/service/prisma.service';

// Mock PrismaService
const mockPrismaService = {
	user: {
		findMany: jest.fn(),
	},
};

// Mock UsersService
const mockUsersService = {
	create: jest.fn(),
	findMany: jest.fn(),
	findFirst: jest.fn(),
	findUnique: jest.fn(),
	update: jest.fn(),
	delete: jest.fn(),
	createMany: jest.fn(),
	updateMany: jest.fn(),
	deleteMany: jest.fn(),
};

describe('UsersResolver', () => {
	let resolver: UsersResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersResolver,
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
				{
					provide: PrismaService,
					useValue: mockPrismaService,
				},
			],
		}).compile();

		resolver = module.get<UsersResolver>(UsersResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
