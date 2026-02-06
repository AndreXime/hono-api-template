import { HTTPException } from "hono/http-exception";
import { database } from "@/database/database";
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

	await database.$transaction(async (transaction) => {
		const user = await transaction.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: passwordHash,
			},
		});

		return user;
	});
}

export { signUp };
