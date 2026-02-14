import { createRoute, z } from "@hono/zod-openapi";
import auth from "@/middlewares/auth";
import { PaginationMetaSchema } from "@/modules/shared/schemas/pagination";
import { UserSchema } from "@/modules/shared/schemas/user";
import { createPaginationSchema } from "@/modules/shared/utils/generatePaginationQuery";

const RequestQuerySchema = createPaginationSchema(["name", "email", "createdAt"]);

export const ReadUserRoute = createRoute({
	method: "get",
	path: "/",
	tags: ["User"],
	summary: "Obter todos os perfis",
	description: "Retorna todos os dados de usuários com paginação.",
	request: {
		query: RequestQuerySchema,
	},
	security: [
		{
			Bearer: [],
		},
	],
	middleware: [auth(["ADMIN"])],
	responses: {
		200: {
			description: "Lista de usuários recuperada com sucesso",
			content: {
				"application/json": {
					schema: z.object({
						data: z.array(UserSchema),
						meta: PaginationMetaSchema,
					}),
				},
			},
		},
		401: {
			description: "Não autenticado",
		},
		403: {
			description: "Acesso negado (Requer ADMIN)",
		},
	},
});
