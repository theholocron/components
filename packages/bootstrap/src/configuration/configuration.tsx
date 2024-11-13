import * as str from "@theholocron/utils-string";
import * as React from "react";
import type { WithChildren } from "../type.ts";

export interface ApplicationConf {
	description?: string;
	id: string;
	name: string;
	slug?: string;
	title?: string;
	version?: string;
}

export interface IConfiguration {
	application: ApplicationConf;
	// fetch?: FetchConf;
}

const Context = React.createContext<IConfiguration | undefined>(undefined);
Context.displayName = "@theholocron/bootstrap/Configuration";

export interface ConfigurationProps extends WithChildren {
	conf: IConfiguration;
}

export function Provider(props: ConfigurationProps) {
	const conf = {
		...props.conf,
		application: {
			...props.conf.application,
			slug: str.toKebabCase(
				props.conf.application?.slug || props.conf.application.id
			),
			title:
				props.conf.application?.title ??
				str.toTitleCase(props.conf.application?.name),
		},
	};

	const value = React.useMemo(() => conf, [conf]);

	return <Context.Provider value={value}>{props.children}</Context.Provider>;
}
Provider.displayName = "@theholocron/bootstrap/Configuration";

export function useConfiguration(): IConfiguration {
	const context = React.useContext(Context);

	if (context === undefined) {
		throw new Error(
			`useConfiguration must be used within Configuration.Provider!`
		);
	}

	return context;
}
