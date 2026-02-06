import { setCookie } from "hono/cookie";
import zValidator from "@/middlewares/validator";
import { SchemaSignIn } from "./login.schema";
import { signIn } from "./login.service";

const registerRoutesSignIn = (server: ServerType) =>
	server.post("/sign-in", zValidator("json", SchemaSignIn), async (ctx) => {
		const { email, password } = ctx.req.valid("json");

		const { token } = await signIn({ email, password });

		setCookie(ctx, "token", token, {
			httpOnly: true,
			//secure: process.env.NODE_ENV === "production",
			secure: true,
			//sameSite: "Strict",
			sameSite: "None",
			path: "/",
			maxAge: 60 * 60 * 24 * 7,
		});

		return ctx.json({ message: "Login com sucesso [LOG]" }, 200);
	});

export { registerRoutesSignIn };
