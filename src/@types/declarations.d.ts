import type { Database } from "@/database/database";
import type { environmentType } from "@/lib/environment";
import type server from "@/index";

declare global {
	type ServerType = typeof server;
}

type AppBindings = {
	Bindings: environmentType;
	Variables: {
		user: JWT;
		database: Database;
	};
};

type JWT = {
	id: string;
	email: string;
	name: string;
};

declare module "hono" {
	interface Context {
		user: JWT;
		database: Database;
	}
}

export type { AppBindings, JWT };
