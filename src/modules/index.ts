import { registerRoutesAuth } from "./auth";

const registerRoutes = (server: ServerType) => {
	registerRoutesAuth(server);
};

export { registerRoutes };
