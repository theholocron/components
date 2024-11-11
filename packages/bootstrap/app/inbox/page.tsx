"use client";

import { Bootstrap } from "../../src/";
import { Inbox } from "../../page/inbox/box";

const conf = {
	application: {
		description: "This is a description for a mock application.",
		id: "bootstrap-app",
		name: "Bootstrap App",
	},
};

export default function InboxPage() {
	return (
		<Bootstrap conf={conf}>
			<Inbox />
		</Bootstrap>
	);
}
