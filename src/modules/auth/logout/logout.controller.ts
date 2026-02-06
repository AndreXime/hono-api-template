import { deleteCookie } from "hono/cookie";

export const registerRoutesLogout = (server: ServerType) => {
	server.post("/logout", async (ctx) => {
		deleteCookie(ctx, "accessToken", { path: "/" });
		deleteCookie(ctx, "refreshToken", { path: "/auth" });

		return ctx.json({ message: "Logout com sucesso" }, 200);
	});
};
