import type { Metadata } from "next";
import * as React from "react";
import MSW from "./msw";

import "@mantine/core/styles.css";

/*
if (process.env.NEXT_RUNTIME === "nodejs") {
	const { server } = require("./msw/node");
	server.listen();
}
*/

export const metadata: Metadata = {
	title: "Next.js App Router + React Server Components Demo",
	description: "Demo of React Server Components in Next.js.",
	openGraph: {
		title: "Next.js App Router + React Server Components Demo",
		description: "Demo of React Server Components in Next.js.",
		images: ["https://next-rsc-notes.vercel.app/og.png"],
	},
	robots: {
		index: true,
		follow: true,
	},
};

export type WithChildren = Readonly<{
	children: React.ReactNode;
}>;

export default function RootLayout(props: WithChildren) {
	return (
		<html lang="en">
			<body style={{ overflow: "hidden" }}>
				<MSW.Provider>{props.children}</MSW.Provider>
			</body>
		</html>
	);
}
