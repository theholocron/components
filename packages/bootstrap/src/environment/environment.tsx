import * as React from "react";
import type { WithChildren } from "../type";

export type TEnvironment = "development" | "test" | "staging" | "production";

const Context = React.createContext<TEnvironment | undefined>(undefined);
Context.displayName = "@theholocron/bootstrap/Environment";

export function Provider(props: WithChildren) {
	const environment =
		process?.env?.NEXT_PUBLIC_ENVIRONMENT ??
		process?.env?.NODE_ENV ??
		process?.env?.ENVIRONMENT ??
		"production";

	const value = React.useMemo(
		() => environment as TEnvironment,
		[environment]
	);

	return <Context.Provider value={value}>{props.children}</Context.Provider>;
}
Provider.displayName = "@theholocron/bootstrap/Environment";

export function useEnvironment(): TEnvironment {
	const context = React.useContext(Context);

	if (context === undefined) {
		throw new Error(
			`useEnvironment must be used within Environment.Provider!`
		);
	}

	return context;
}
