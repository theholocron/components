import * as React from "react";
import type { WithChildren } from "../type";

export interface ILoading {
	isLoading?: boolean;
	setLoading?: (isLoading: boolean) => void;
}

const Context = React.createContext<ILoading | undefined>(undefined);
Context.displayName = "@theholocron/bootstrap/Loading";

export interface LoadingProps extends WithChildren {
	loader: React.ReactElement | React.ComponentType;
}

export function Provider(props: LoadingProps) {
	const { children, loader: Loader } = props;

	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const setLoading = React.useCallback((state: boolean) => {
		setIsLoading(state);
	}, []);

	const value = React.useMemo(() => ({ isLoading, setLoading }), [isLoading]);

	return (
		<Context.Provider value={value}>
			{isLoading ? <Loader /> : children}
		</Context.Provider>
	);
}
Provider.displayName = "@theholocron/bootstrap/Loading";

export function useLoading(): ILoading {
	const context = React.useContext(Context);

	if (context === undefined) {
		throw new Error("useLoading must be used within Loading.Provider!");
	}

	return context;
}
