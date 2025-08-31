import { Test } from '@nestjs/testing';
import type { TestingModule } from '@nestjs/testing';
import { AppController } from '@src/app/app.controller';
import { AppService } from '@src/app/app.service';
import { PrismaService } from '@src/base/services/prisma/service/prisma.service';

// Mock PrismaService
const mockPrismaService = {
	user: {
		findMany: jest.fn(),
	},
};

describe('AppController', () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [
				AppService,
				{
					provide: PrismaService,
					useValue: mockPrismaService,
				},
			],
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	describe('root', () => {
		it('should return "Hello World!"', () => {
			expect(appController.getHello()).toBe('Hello World!');
		});
	});
});
