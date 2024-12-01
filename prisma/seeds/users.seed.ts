import { faker } from '@faker-js/faker';
import { UserRole } from '@prisma/client';
import { encodePassword } from '@models/users/common/utils';

const users = [];

export const password = '12345678';

const firstUser = {
	email: 'david@nestql.com',
	password: encodePassword(password),
	role: UserRole.SUPER_ADMIN,
};
users.push(firstUser);

const secondUser = {
	email: 'admin@nestql.com',
	password: encodePassword(password),
	role: UserRole.ADMIN,
};
users.push(secondUser);

const thirdUser = {
	email: 'demo@nestql.com',
	password: encodePassword(password),
	role: UserRole.ADMIN,
};
users.push(thirdUser);

const fourthUser = {
	email: 'test@nestql.com',
	password: encodePassword(password),
	role: UserRole.USER,
};
users.push(fourthUser);

let count = 1;
const userCount = 53;

while (count <= userCount) {
	const user = {
		email: faker.internet.email(),
		password: encodePassword(faker.internet.password()),
	};

	users.push(user);
	count += 1;
}

const allUsersCount = users.length;

export { users, firstUser, secondUser, thirdUser, fourthUser, allUsersCount };
