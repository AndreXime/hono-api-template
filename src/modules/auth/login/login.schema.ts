import { z } from "zod";
import { SchemaEmail, SchemaPassword } from "@/modules/shared/schemas/user";

const SchemaSignIn = z.object({
	email: SchemaEmail,
	password: SchemaPassword,
});

export type UserSignIn = z.infer<typeof SchemaSignIn>;

export { SchemaSignIn };
