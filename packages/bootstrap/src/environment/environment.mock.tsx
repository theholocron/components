import * as React from "react";
import { useEnvironment } from "./environment";

export function TestComponent () {
	const environment = useEnvironment();

	return <div data-testid="environment-display">Current Environment: {environment}</div>;
}
