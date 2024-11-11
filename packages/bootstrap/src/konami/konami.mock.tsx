import { useKonami } from "./konami";

export function TestComponent () {
	const hasEnteredCode = useKonami();

	return <div data-testid="has-entered">{hasEnteredCode ? "Entered" : "Not Entered"}</div>;
}