"use client";

import { Bootstrap } from "../../src/";
import { Loader } from "../../src/loading/loading.mock";
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
		<Bootstrap conf={conf} loader={<Loader />}>
			<Inbox />
		</Bootstrap>
	);
}
