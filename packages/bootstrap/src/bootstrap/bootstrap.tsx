import { MantineProvider } from "@mantine/core";
import Configuration, { type IConfiguration } from "../configuration/";
import Environment from "../environment/";
import Konami from "../konami/";
import Loading, { type LoadingProps } from "../loading/";
import Location from "../location/";
import Storage from "../storage/";
import { theme } from "../theme";
import type { WithChildren } from "../type";
import { Container } from "./container";

export interface BootstrapProps extends WithChildren {
	conf: IConfiguration;
	loader: Pick<LoadingProps, "loader">;
}

export function Bootstrap(props: BootstrapProps) {
	return (
		<Configuration.Provider conf={props.conf}>
			<Environment.Provider>
				<Storage.Provider conf={props.conf?.application}>
					<MantineProvider theme={theme}>
						<Loading.Provider loader={props.loader}>
							<Location.Provider>
								<Container conf={props.conf}>
									<Konami.Provider>
										{props.children}
									</Konami.Provider>
								</Container>
							</Location.Provider>
						</Loading.Provider>
					</MantineProvider>
				</Storage.Provider>
			</Environment.Provider>
		</Configuration.Provider>
	);
}
Container.displayName = "@theholocron/bootstrap";
