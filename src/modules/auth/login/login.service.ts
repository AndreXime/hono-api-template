import { HTTPException } from "hono/http-exception";
import { database } from "@/database/database";
import { verifyPassword } from "@/modules/auth/shared/hash";
import { generateAuthTokens } from "../shared/tokens";
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

	return await generateAuthTokens(user.id, user.email, user.name, user.role);
}

export { signIn };
