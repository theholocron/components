import { expect, userEvent, within } from "@storybook/test";
import * as React from "react";
import * as MockEnvironment from "./environment.mock";
import Environment, { useEnvironment } from "./index";

export default {
	component: Environment.Provider,
	title: "Environment",
};

export const Default = (args) => (
	<Environment.Provider {...args}>
		<MockEnvironment.TestComponent />
	</Environment.Provider>
);
Default.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);

	// Expect the displayed environment
	const environmentDisplay = await canvas.findByTestId("environment-display");
	expect(environmentDisplay).toHaveTextContent("Current Environment: development"); // Change this based on your mocked environment
};

// Attempt to use the hook without provider
export const Error = () => {
	const Component = () => {
		try {
			useEnvironment();
		} catch (error) {
			return <div data-testid="error-message">{error.message}</div>;
		}
		return null; // Render nothing if no error
	};

	return <Component />;
};
Error.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);

	const errorMessage = await canvas.findByTestId("error-message");
	expect(errorMessage).toHaveTextContent("useEnvironment must be used within Environment.Provider!");
};
