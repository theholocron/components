import { useEnvironment } from "./index.ts";

export function TestComponent() {
	const environment = useEnvironment();

	return (
		<div data-testid="environment-display">
			Current Environment: {environment}
		</div>
	);
}
