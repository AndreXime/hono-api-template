export async function verifyPassword(password: string, hash: string) {
	return await Bun.password.verify(password, hash, "argon2d");
}

export async function hashPassword(password: string) {
	return await Bun.password.hash(password, "argon2d");
}
