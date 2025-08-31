import { UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
	const saltRounds = 12;
	const hash = await bcrypt.hash(password, saltRounds);
	return hash;
};

export const getUsers = async () => {
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

	return {
		users,
		firstUser,
		secondUser,
		thirdUser,
		fourthUser,
		allUsersCount,
	};
};
