import * as React from "react";
import { type IConfiguration } from "../configuration/";
import { useEnvironment } from "../environment/";
import { useStorage } from "../storage/";
import type { WithChildren } from "../type";

export interface ContainerProps extends WithChildren {
	conf: IConfiguration;
}

export function Container(props: ContainerProps) {
	const environment = useEnvironment();
	const storage = useStorage();

	const { application } = props.conf;

	storage.sendTo("application", application);
	storage.sendTo("environment", environment);

	return <React.Fragment>{props.children}</React.Fragment>;
}
Container.displayName = "@theholocron/bootstrap/Container";
