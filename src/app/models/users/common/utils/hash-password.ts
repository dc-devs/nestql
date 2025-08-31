import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
	const saltRounds = 12;
	const argonHash = await bcrypt.hash(password, saltRounds);
	return argonHash;
};
