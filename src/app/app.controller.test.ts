import { expect, test, describe, beforeEach } from 'bun:test';
import { AppService } from '@src/app/app.service';
import { AuthModule } from '@models/auth/auth.module';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@src/app/app.controller';
import { UsersModule } from '@models/users/users.module';
import { GraphQLModule, ConfigModule } from '@base/app/modules';

describe('AppController', () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [AuthModule, UsersModule, ConfigModule, GraphQLModule],
			controllers: [AppController],
			providers: [AppService],
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	describe('root', () => {
		test('should return "Hello World!"', () => {
			expect(appController.getHello()).toBe('Hello World!');
		});
	});
});
