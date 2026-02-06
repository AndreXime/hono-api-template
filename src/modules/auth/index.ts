import { registerRoutesSignIn } from "./login/login.controller";
import { registerRoutesLogout } from "./logout/logout.controller";
import { registerRoutesMe } from "./me/me.controller";
import { registerRoutesSignUp } from "./register/register.controller";

const registerRoutesAuth = (server: ServerType) => {
	const app = server.basePath("/auth");

	registerRoutesSignIn(app);
	registerRoutesSignUp(app);
	registerRoutesLogout(app);
	registerRoutesMe(app);
};

export { registerRoutesAuth };
