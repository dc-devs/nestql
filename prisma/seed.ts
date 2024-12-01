import { PrismaClient } from '@prisma/client';
import { users } from '@seeds/index';

const prisma = new PrismaClient();

const main = async () => {
	await prisma.user.createMany({
		data: [...users],
	});
};

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		console.log('Database has been seeded. 🌱');
		await prisma.$disconnect();
	});
