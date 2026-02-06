import { z } from "zod";
import { SchemaEmail, SchemaName, SchemaPassword } from "@/modules/shared/schemas/user";

export const RegisterUserSchema = z
	.object({
		name: z.string({ error: "Nome completo é obrigatório." }).pipe(SchemaName),
		email: z.string({ error: "E-mail é obrigatório." }).pipe(SchemaEmail),
		password: z.string({ error: "Senha é obrigatória." }).pipe(SchemaPassword),
		confirmPassword: z
			.string({ error: "Confirmação de senha é obrigatória." })
			.min(6, { error: "A confirmação de senha deve ter no mínimo 6 caracteres." }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não coincidem.",
		path: ["confirmPassword"],
	});

export type RegisterUserSchema = z.infer<typeof RegisterUserSchema>;
