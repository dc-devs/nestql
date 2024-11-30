import { expect, test, describe, beforeEach, afterAll } from 'bun:test';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@src/app.module';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	test('/ (GET)', async () => {
		const response = await fetch(
			`http://localhost:${process.env.PORT || 3000}/`,
		);
		expect(response.status).toBe(200);
		expect(await response.text()).toBe('Hello World!');
	});

	afterAll(async () => {
		await app.close();
	});
});
