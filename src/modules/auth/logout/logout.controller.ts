import { deleteCookie } from "hono/cookie";

export const registerRoutesLogout = (server: ServerType) => {
	server.post("/logout", async (ctx) => {
		deleteCookie(ctx, "token", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "Strict",
			path: "/",
		});
		return ctx.json({ message: "Logout com sucesso" }, 200);
	});
};
