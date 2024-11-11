"use client";

import * as React from "react";
import { Bootstrap } from "../../src/";
import { Login } from "../login";
import { useAuth } from "./auth";
import { Inbox } from "./box";

const conf = {
	application: {
		description: "This is a description for a mock application.",
		id: "rando",
		name: "Rando",
	},
};

export function InboxPage () {
	const [user, logIn] = useAuth();

	if (user?.token) {
		return (
			<Bootstrap conf={conf}>
				<Inbox />;
			</Bootstrap>
		);
	}

	return <Login onLogIn={logIn} />;
}
