import { storage, type TSessionStorage } from "@theholocron/utils-storage";
import * as React from "react";
import { type ApplicationConf } from "../configuration/index";
import type { WithChildren } from "../type";

const Context = React.createContext<TSessionStorage | undefined>(undefined);
Context.displayName = "@theholocron/bootstrap/Storage";

export interface StorageProps extends WithChildren {
	conf: ApplicationConf;
}

export function Provider(props: StorageProps) {
	const value = React.useMemo(() => {
		const vault = storage.session.create();

		vault.registerApp(props.conf.id);
		vault.sendTo("application.name", props.conf.name);
		vault.sendTo("build.version", props.conf?.version ?? "0.0.0");

		return vault;
	}, [props.conf.id, props.conf.name, props.conf.version]);

	return <Context.Provider value={value}>{props.children}</Context.Provider>;
}
Provider.displayName = "@theholocron/bootstrap/Storage";

export function useStorage(): TSessionStorage {
	const context = React.useContext(Context);

	if (context === undefined) {
		throw new Error("useStorage must be used within Storage.Provider!");
	}

	return context;
}
