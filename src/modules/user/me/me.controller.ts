import auth from "@/middlewares/auth";
import { getUserById } from "./me.service";

export const registerRoutesMe = (server: ServerType) => {
	server.get("/me", auth(), async (ctx) => {
		const currentUser = ctx.get("user");

		const user = await getUserById(currentUser.id);

		return ctx.json(user, 200);
	});
};
