import { setCookie } from "hono/cookie";
import environment from "@/lib/environment";
import zValidator from "@/middlewares/validator";
import { SchemaSignIn } from "./login.schema";
import { signIn } from "./login.service";

const registerRoutesSignIn = (server: ServerType) =>
	server.post("/login", zValidator("json", SchemaSignIn), async (ctx) => {
		const { email, password } = ctx.req.valid("json");

		const token = await signIn({ email, password });

		setCookie(ctx, "token", token, {
			httpOnly: true,
			secure: environment.ENV === "PROD",
			sameSite: "Strict",
			path: "/",
			maxAge: 60 * 60 * 24,
		});

		return ctx.json({ message: "Login com sucesso [LOG]" }, 200);
	});

export { registerRoutesSignIn };
