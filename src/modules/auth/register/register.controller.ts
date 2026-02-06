import { setCookie } from "hono/cookie";
import environment from "@/lib/environment";
import zValidator from "@/middlewares/validator";
import { RegisterUserSchema } from "@/modules/auth/register/register.schema";
import { signUp } from "./register.service";

const registerRoutesSignUp = (server: ServerType) => {
	server.post("/register", zValidator("json", RegisterUserSchema), async (ctx) => {
		const validatedData = ctx.req.valid("json");
		const token = await signUp(validatedData);

		setCookie(ctx, "token", token, {
			httpOnly: true,
			secure: environment.ENV === "PROD",
			sameSite: "Strict",
			path: "/",
			maxAge: 60 * 60 * 24,
		});

		return ctx.json({ message: "Cadastro enviado com sucesso" }, 201);
	});
};

export { registerRoutesSignUp };
