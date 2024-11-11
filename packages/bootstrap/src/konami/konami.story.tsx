import { expect, userEvent, within } from "@storybook/test";
import { konami } from "@theholocron/utils-misc";
import * as React from "react";
import Konami, { useKonami } from "./index";
import * as MockKonami from "./konami.mock";

export default {
	component: Konami.Provider,
	title: "Konami",
};

export const Default = () => (
	<Konami.Provider>
		<MockKonami.TestComponent />
	</Konami.Provider>
);
Default.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);

	// 1. Verify initial state (Konami code has not been entered)
	const component = await canvas.findByTestId("has-entered");
	await expect(component).toHaveTextContent("Not Entered");

	// 2. Simulate each keypress in the Konami Code sequence
	for (const key of konami.CODE) {
		await userEvent.keyboard(key);
	}
	// 3. Verify the updated state (Konami code has been entered)
	await expect(component).toHaveTextContent("Entered");
};

// Attempt to use the hook without provider
export const Error = () => {
	const Component = () => {
		try {
			useKonami();
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
	expect(errorMessage).toHaveTextContent("useKonami must be used within Konami.Provider!");
};
