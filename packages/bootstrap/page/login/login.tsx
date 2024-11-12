"use client";

import { Bootstrap } from "../../src/";
import { Loader } from "../../src/loading/loading.mock";
import { Login } from "./form";
import { useAuth } from "../inbox/auth/";

const conf = {
	application: {
		description: "This is a description for a mock application.",
		id: "bootstrap-app",
		name: "Bootstrap App",
	},
};

export function LoginPage() {
	const [, logIn] = useAuth();

	return (
		<Bootstrap conf={conf} loader={<Loader />}>
			<Login onLogIn={logIn} />
		</Bootstrap>
	);
}
