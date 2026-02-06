import { Hono } from "hono";
import { csrf } from "hono/csrf";
import type { AppBindings } from "@/@types/declarations";
import { registerRoutes } from "@/modules";
import { PrismaDatabase } from "./database/database";
import { log, showRoutes } from "./lib/dev";
import environment from "./lib/environment";
import redis from "./lib/redis";
import storage from "./lib/storage";
import cors from "./middlewares/cors";
import database from "./middlewares/database";
import errors from "./middlewares/errors";
import requestLogger from "./middlewares/logger";
import rateLimiter from "./middlewares/rate-limiter";

const server = new Hono<AppBindings>();

if (environment.ENV === "DEV") {
	server.use(requestLogger);
}

server.use(cors);
server.use(database);
server.use(
	csrf({
		origin: [environment.FRONTEND_URL],
	}),
);

// 100 requisições a cada 15 minutos por IP
server.use(rateLimiter(100, 15, "global"));

server.onError(errors);
registerRoutes(server);

server.notFound((c) => c.json({ message: "Rota não econtrada" }, 404));

if (environment.ENV === "DEV") {
	showRoutes(server);
}

log(`Iniciando servidor no modo: ${environment.ENV}`, "info");
await storage.testConnection();
await PrismaDatabase.testConnection();
await redis.testConnection();

export default server;
