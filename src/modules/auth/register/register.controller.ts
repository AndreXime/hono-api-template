import zValidator from "@/middlewares/validator";
import { RegisterUserSchema } from "@/modules/auth/register/register.schema";
import { signUp } from "./register.service";

const registerRoutesSignUp = (server: ServerType) => {
	server.post("/register", zValidator("json", RegisterUserSchema), async (ctx) => {
		const validatedData = ctx.req.valid("json");
		await signUp(validatedData);
		return ctx.json({ message: "Cadastro enviado com sucesso, aguarde um gestor aprovar seu acesso" }, 201);
	});
};

export { registerRoutesSignUp };
