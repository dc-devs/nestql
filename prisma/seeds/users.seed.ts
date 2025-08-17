import { UserRole } from '@prisma/client';
import { hashPassword } from '../../src/app/models/users/common/utils/hash-password';

const users = [];
const password = 'n@st123!';

const firstUser = {
	role: UserRole.SUPER_ADMIN,
	email: 'david@nestql.com',
	password: await hashPassword(password),
};
users.push(firstUser);

const secondUser = {
	role: UserRole.ADMIN,
	email: 'admin@nestql.com',
	password: await hashPassword(password),
};
users.push(secondUser);

const thirdUser = {
	email: 'demo@nestql.com',
	password: await hashPassword(password),
};
users.push(thirdUser);

const fourthUser = {
	email: 'test@nestql.com',
	password: await hashPassword(password),
};
users.push(fourthUser);

const allUsersCount = users.length;

export { users, firstUser, secondUser, thirdUser, fourthUser, allUsersCount };
