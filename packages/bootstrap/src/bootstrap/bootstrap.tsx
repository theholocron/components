import * as React from "react";
import Configuration, { type IConfiguration } from "../configuration/index";
import Environment, { useEnvironment } from "../environment/index";
import Konami from "../konami/index";
import Loading from "../loading/index";
import { type LoadingProps } from "../loading/loading";
import Location from "../location/index";
import Storage, { useStorage } from "../storage/index";
import type { WithChildren } from "../type";

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
