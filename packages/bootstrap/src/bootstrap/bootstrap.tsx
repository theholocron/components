import * as React from "react";
import Configuration, { type IConfiguration } from "../configuration/index.ts";
import Environment, { useEnvironment } from "../environment/index.ts";
import Konami from "../konami/index.ts";
import Loading from "../loading/index.ts";
import { type LoadingProps } from "../loading/loading.tsx";
import Location from "../location/index.ts";
import Storage, { useStorage } from "../storage/index.ts";
import type { WithChildren } from "../type.ts";

interface ContainerProps extends WithChildren {
	conf: IConfiguration;
}

function Container(props: ContainerProps) {
	const environment = useEnvironment();
	const storage = useStorage();

	const { application } = props.conf;

	storage.sendTo("application", application);
	storage.sendTo("environment", environment);

	return <React.Fragment>{props.children}</React.Fragment>;
}
Container.displayName = "@theholocron/bootstrap/Container";

export interface BootstrapProps
	extends WithChildren,
		Pick<LoadingProps, "loader"> {
	conf: IConfiguration;
}

export function Bootstrap(props: BootstrapProps) {
	return (
		<Configuration.Provider conf={props.conf}>
			<Environment.Provider>
				<Storage.Provider conf={props.conf?.application}>
					<Loading.Provider loader={props.loader}>
						<Location.Provider>
							<Container conf={props.conf}>
								<Konami.Provider>
									{props.children}
								</Konami.Provider>
							</Container>
						</Location.Provider>
					</Loading.Provider>
				</Storage.Provider>
			</Environment.Provider>
		</Configuration.Provider>
	);
}
Container.displayName = "@theholocron/bootstrap";
