"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { Bootstrap } from "../../src/";
import { useAuth } from "../inbox/auth/";
import { Inbox } from "./box";

const conf = {
	application: {
		description: "This is a description for a mock application.",
		id: "bootstrap-app",
		name: "Bootstrap App",
	},
};

export function InboxPage() {
	const [user] = useAuth();
	const router = useRouter();

	React.useEffect(() => {
		if (!user?.token) {
			router.push("/login");
		}
	}, [user?.token]);

	return (
		<Bootstrap conf={conf}>
			<Inbox />
		</Bootstrap>
	);
}
