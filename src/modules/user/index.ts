import createRouter from "@/lib/createRouter";
import { registerRoutesMe } from "../user/me/me.controller";

export const createRoutesUser = () => {
	const app = createRouter({ auth: true });

	registerRoutesMe(app);

	return app;
};
