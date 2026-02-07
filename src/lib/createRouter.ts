import { OpenAPIHono } from "@hono/zod-openapi";
import type { AppBindings } from "@/@types/declarations";
import authMiddleware from "@/middlewares/auth";
import { zodHook } from "@/middlewares/validator";

type CreateRouterOptions = {
	auth?: boolean;
};

export default function createRouter(options: CreateRouterOptions = {}) {
	const app = new OpenAPIHono<AppBindings>({
		defaultHook: zodHook,
	});

	if (options.auth) {
		app.use("/*", authMiddleware());
	}

	return app;
}
