import zValidator from "@/middlewares/validator";
import { setAuthCookies } from "../shared/tokens";
import { SchemaSignIn } from "./login.schema";
import { signIn } from "./login.service";

const registerRoutesSignIn = (server: ServerType) =>
	server.post("/login", zValidator("json", SchemaSignIn), async (ctx) => {
		const { email, password } = ctx.req.valid("json");

		const { accessToken, refreshToken } = await signIn({ email, password });

		setAuthCookies(ctx, accessToken, refreshToken);

		return ctx.json({ message: "Login com sucesso [LOG]" }, 200);
	});

export { registerRoutesSignIn };
