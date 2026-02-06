import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";
import { database } from "@/database/database";
import environment from "@/lib/environment";
import { hashPassword } from "@/modules/shared/lib/hash";
import type { RegisterUserSchema } from "./register.schema";

async function signUp(data: RegisterUserSchema) {
	const existingUser = await database.user.findUnique({
		where: { email: data.email },
		select: { id: true },
	});

	if (existingUser) {
		throw new HTTPException(409, { message: "Este e-mail já está cadastrado." });
	}

	const passwordHash = await hashPassword(data.password);

	const user = await database.user.create({
		data: {
			name: data.name,
			email: data.email,
			password: passwordHash,
		},
	});

	const now = Math.floor(Date.now() / 1000);

	const token = await sign(
		{
			id: user.id,
			email: user.email,
			name: user.name,
			iat: now,
			exp: now + environment.JWT_EXPIRATION,
		},
		process.env.JWT_SECRET as string,
		"HS256",
	);

	return token;
}

export { signUp };
