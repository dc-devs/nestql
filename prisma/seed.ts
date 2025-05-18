import { users, chatSessions, messages } from '@seeds/index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
	await prisma.user.createMany({
		data: [...users],
	});

	await prisma.chatSession.createMany({
		data: [...chatSessions],
	});

	await prisma.message.createMany({
		data: [...messages],
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
