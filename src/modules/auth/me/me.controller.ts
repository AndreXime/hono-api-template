import { auth } from "@/middlewares/auth";

export const registerRoutesMe = (server: ServerType) => {
	server.get("/me/detailed", auth(), async (ctx) => {
		const currentUser = ctx.get("user");

		const user = await ctx.database.user.findUnique({
			where: { id: currentUser.id },
			select: {
				id: true,
				name: true,
				email: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return ctx.json(user, 200);
	});
};
