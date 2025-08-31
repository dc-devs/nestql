import { Test } from '@nestjs/testing';
import type { TestingModule } from '@nestjs/testing';
import { AuthResolver } from '@src/app/routes/auth/auth.resolver';
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

// Mock AuthService
const mockAuthService = {
	signUp: jest.fn(),
	signIn: jest.fn(),
	signOut: jest.fn(),
	getAuthSession: jest.fn(),
};

describe('AuthResolver', () => {
	let resolver: AuthResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthResolver,
				{
					provide: AuthService,
					useValue: mockAuthService,
				},
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

		resolver = module.get<AuthResolver>(AuthResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
