import { Test } from '@nestjs/testing';
import type { TestingModule } from '@nestjs/testing';
import { AuthService } from '@src/app/routes/auth/auth.service';
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

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: PrismaService,
					useValue: mockPrismaService,
				},
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
