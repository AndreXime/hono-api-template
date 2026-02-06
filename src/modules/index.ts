import { registerRoutesAuth } from "./auth";
import { registerRoutesUser } from "./user";

const registerRoutes = (server: ServerType) => {
	registerRoutesAuth(server);
	registerRoutesUser(server);
};

export { registerRoutes };
