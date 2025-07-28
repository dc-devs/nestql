import { expect, test, describe, beforeEach, afterAll } from 'bun:test';
import { Test, type TestingModule } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { AppModule } from '@src/app/app.module';
import { Port } from '@src/base/server/enums/port.enum';

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
		const response = await fetch(`http://localhost:${Port.Development}/`);
		expect(response.status).toBe(200);
		expect(await response.text()).toBe('Hello World!');
	});

	afterAll(async () => {
		await app.close();
	});
});
