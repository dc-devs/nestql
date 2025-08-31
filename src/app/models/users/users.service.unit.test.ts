import { Test } from '@nestjs/testing';
import type { TestingModule } from '@nestjs/testing';
import { UsersService } from '@src/app/models/users/users.service';
import { PrismaService } from '@src/base/services/prisma/service/prisma.service';

// Mock PrismaService
const mockPrismaService = {
	user: {
		findMany: jest.fn(),
	},
};

describe('UsersService', () => {
	let service: UsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: PrismaService,
					useValue: mockPrismaService,
				},
			],
		}).compile();

		service = module.get<UsersService>(UsersService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
