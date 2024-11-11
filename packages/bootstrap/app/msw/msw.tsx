"use client";

import { Suspense, use } from "react";

const mockingEnabledPromise =
	typeof window !== "undefined"
		? import("./browser").then(async ({ worker }) => {
			await worker.start({
				onUnhandledRequest(request, print) {
					if (request.url.includes("_next")) {
						return;
					}
					print.warning();
				},
			})
		})
		: Promise.resolve();


export type WithChildren = Readonly<{
	children: React.ReactNode;
}>;

function Wrapper (props: WithChildren) {
	use(mockingEnabledPromise);
	return props.children;
}

export function Provider (props: WithChildren) {
	// If MSW is enabled, we need to wait for the worker to start,
	// so we wrap the children in a Suspense boundary until it's ready.
	return (
		<Suspense fallback={null}>
			<Wrapper>{props.children}</Wrapper>
		</Suspense>
	);
}
