import * as React from "react";
import { useConfiguration } from "./configuration";

export const mockConf = {
	application: {
		description: "This is a description for a mock application.",
		id: "mock-app-id",
		name: "A Mock Application",
		get slug (): string {
			return `${this.id}-slug`;
		},
	},
	// fetch: {},
};

export function TestComponent () {
	const conf = useConfiguration();

	return (
		<div data-testid="mock-configuration">
			<pre>{JSON.stringify(conf, null, 4)}</pre>
		</div>
	);
}
