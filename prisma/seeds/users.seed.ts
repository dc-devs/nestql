import { UserRole } from '@prisma/client';

// Copy of hashPassword from src/app/models/users/common/utils/hash-password.ts
const hashPassword = async (password: string): Promise<string> => {
	const argonHash = await Bun.password.hash(password, {
		algorithm: 'argon2id', // Best choice for general password hashing
		memoryCost: 65536, // 64MB - good balance of security vs performance
		timeCost: 4, // Higher iteration count for better security
	});

	return argonHash;
};

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
