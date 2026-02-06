import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";
import { database } from "@/database/database";
import { verifyPassword } from "@/modules/shared/lib/hash";
import type { UserSignIn } from "./login.schema";

async function signIn({ email, password }: UserSignIn) {
	const user = await database.user.findUnique({
		where: {
			email,
		},
	});

	if (!user) {
		throw new HTTPException(404, {
			message: "Usuário não encontrado",
		});
	}

	const isPasswordValid = await verifyPassword(password, user.password);

	if (!isPasswordValid) {
		throw new HTTPException(401, {
			message: "Senha inválida",
		});
	}

	const now = Math.floor(Date.now() / 1000);
	const expiresIn = 60 * 60 * 24; // 1 dia

	const token = await sign(
		{
			id: user.id,
			email: user.email,
			name: user.name,
			iat: now,
			exp: now + expiresIn,
		},
		process.env.JWT_SECRET as string,
		"HS256",
	);

	return token;
}

export { signIn };
