import { z } from "zod";

export const SchemaPassword = z.string("PASSWORD must be a string").min(6, "PASSWORD must be at least 6 characters");

export const UserSchema = z.object({
	id: z.string().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
	name: z.string().openapi({ example: "André Ximenes" }),
	email: z.email().openapi({ example: "andre@exemplo.com" }),
	role: z.enum(["ADMIN", "CUSTOMER", "SUPPORT"]).openapi({ example: "CUSTOMER" }),
	createdAt: z.iso.datetime().openapi({ example: "2026-02-01T10:00:00Z" }),
	updatedAt: z.iso.datetime().openapi({ example: "2026-02-05T15:30:00Z" }),
});
