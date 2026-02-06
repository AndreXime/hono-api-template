import { registerRoutesMe } from "../user/me/me.controller";

const registerRoutesAuth = (server: ServerType) => {
	const app = server.basePath("/user");

	registerRoutesMe(app);
};

export { registerRoutesAuth };
