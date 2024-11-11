import { konami } from "@theholocron/utils-misc";
import * as React from "react";
import { type WithChildren } from "../type";

const Context = React.createContext<boolean | undefined>(undefined);
Context.displayName = "@theholocron/bootstrap/Konami";

export function Provider (props: WithChildren) {
	const [hasEnteredCode, setHasEnteredCode] = React.useState<boolean>(false);

	React.useEffect(() => {
		const handleKonamiCode = (event: KeyboardEvent) => {
			if (konami.is(event)) {
				setHasEnteredCode(true);
				document.removeEventListener("keydown", handleKonamiCode);
			}
		};

		document.addEventListener("keydown", handleKonamiCode);

		return () => {
			document.removeEventListener("keydown", handleKonamiCode);
		};
	}, [setHasEnteredCode]);

	const value = React.useMemo(() => hasEnteredCode, [hasEnteredCode]);

	return <Context.Provider value={value}>{props.children}</Context.Provider>;
}
Provider.displayName = "@theholocron/bootstrap/Konami";

export function useKonami (): boolean {
	const context = React.useContext(Context);

	if (context === undefined) {
		throw new Error(`useKonami must be used within Konami.Provider!`);
	}

	return context;
}
