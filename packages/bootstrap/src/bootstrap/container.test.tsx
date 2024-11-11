import { render } from "@testing-library/react";
import { useAnalytics } from "../analytics";
import * as MockConfiguration from "../configuration/configuration.mock";
import Configuration from "../configuration";
import Environment from "../environment";
import { useMonitoring } from "../monitoring";
import Storage from "../storage";
import { Container } from "./container";

jest.mock("../analytics");
jest.mock("../monitoring");

describe("Container", () => {
	test("should render its children", () => {
		const mockUser = { id: "123" };
		const mockApp = {};
		const mockLoan = { id: "456" };

		(useAnalytics as jest.Mock).mockReturnValue({ fullstory: { identify: jest.fn(), anonymize: jest.fn(), setUserVars: jest.fn() } });
		(useMonitoring as jest.Mock).mockReturnValue({ sentry: { setUser: jest.fn(), setContext: jest.fn(), captureMessage: jest.fn(), captureException: jest.fn() } });

		const { getByText } = render(
			<Configuration.Provider conf={MockConfiguration.mockConf}>
				<Environment.Provider>
					<Storage.Provider conf={MockConfiguration.mockConf.application}>
						<Container>
							<div>Test Child</div>
						</Container>
					</Storage.Provider>
				</Environment.Provider>
			</Configuration.Provider>
		);

		expect(getByText("Test Child")).toBeInTheDocument();
	});
});
