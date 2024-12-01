const encodePassword = async (password: string): Promise<string> => {
	const argonHash = await Bun.password.hash(password, {
		algorithm: 'argon2id', // Best choice for general password hashing
		memoryCost: 65536, // 64MB - good balance of security vs performance
		timeCost: 4, // Higher iteration count for better security
	});

	return argonHash;
};

export { encodePassword };
