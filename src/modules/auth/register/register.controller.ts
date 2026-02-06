import zValidator from "@/middlewares/validator";
import { RegisterUserSchema } from "@/modules/auth/register/register.schema";
import { setAuthCookies } from "../shared/tokens";
import { signUp } from "./register.service";

const registerRoutesSignUp = (server: ServerType) => {
	server.post("/register", zValidator("json", RegisterUserSchema), async (ctx) => {
		const validatedData = ctx.req.valid("json");

		const { accessToken, refreshToken } = await signUp(validatedData);

		setAuthCookies(ctx, accessToken, refreshToken);

		return ctx.json({ message: "Cadastro enviado com sucesso" }, 201);
	});
};

export { registerRoutesSignUp };
