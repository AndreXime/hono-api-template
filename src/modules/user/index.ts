import { registerRoutesMe } from "../user/me/me.controller";

const registerRoutesUser = (server: ServerType) => {
	const app = server.basePath("/user");

	registerRoutesMe(app);
};

export { registerRoutesUser };
