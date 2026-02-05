import { zValidator as zv } from "@hono/zod-validator";

import type { ValidationTargets } from "hono";
import type { ZodSchema } from "zod";

/*
Target validos:
'json': Para validar o body da requisição.
'form': Para validar dados de um formulário (FormData).
'query': Para validar os parâmetros de busca da URL (ex: /search?q=termo).
'param': Para validar os parâmetros da rota (ex: /users/:id).
'header': Para validar os cabeçalhos da requisição.
'cookie': Para validar os cookies enviados.
*/

/**
 * De acordo com um target da requisição, valida usando um schema Zod
 */
export const zValidator = <T extends ZodSchema, Target extends keyof ValidationTargets>(target: Target, schema: T) =>
	zv(target, schema, (result, ctx) => {
		if (!result.success) {
			// Sempre retorna um array para o front-end saber o que esperar
			const errorResponse = result.error.issues.map((issue) => ({
				param: issue.path.join("_"),
				message: issue.message,
			}));

			return ctx.json({ errors: errorResponse }, 400);
		}
	});
