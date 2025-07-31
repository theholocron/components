import { useEnvironment } from "./index";

export function TestComponent() {
	const environment = useEnvironment();

	return (
		<div data-testid="environment-display">
			Current Environment: {environment}
		</div>
	);
}
