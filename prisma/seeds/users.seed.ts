import { faker } from '@faker-js/faker';
import { UserRole } from '@prisma/client';
import { hashPassword } from '@models/users/common/utils';

const models = [];

export const password = '12345678';

const firstModel = {
	email: 'david@nestql.com',
	password: await hashPassword(password),
	role: UserRole.SUPER_ADMIN,
};
models.push(firstModel);

const secondModel = {
	email: 'admin@nestql.com',
	password: await hashPassword(password),
	role: UserRole.ADMIN,
};
models.push(secondModel);

const thirdModel = {
	email: 'demo@nestql.com',
	password: await hashPassword(password),
	role: UserRole.ADMIN,
};
models.push(thirdModel);

const fourthModel = {
	email: 'test@nestql.com',
	password: await hashPassword(password),
	role: UserRole.USER,
};
models.push(fourthModel);

let count = 1;
const modelCount = 53;

while (count <= modelCount) {
	const user = {
		email: faker.internet.email(),
		password: faker.internet.password(),
	};

	models.push(user);
	count += 1;
}

const allModelsCount = models.length;

export {
	models,
	firstModel,
	secondModel,
	thirdModel,
	fourthModel,
	allModelsCount,
};
