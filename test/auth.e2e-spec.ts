import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

const userDto = {
	login: 'awa@m.ru',
	password: '123qwerty',
};

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(userDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined();
			});
	});

	it('/auth/login (POST) - fail password', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...userDto, password: 'novalidpass' })
			.expect(401, {
				statusCode: 401,
				message: 'Неверный пароль',
				error: 'Unauthorized',
			});
	});

	it('/auth/login (POST) - fail login', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...userDto, login: 'novalidlogin' })
			.expect(401, {
				statusCode: 401,
				message: 'Пользователь с таким email не найден',
				error: 'Unauthorized',
			});
	});
});
