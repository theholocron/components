import { expect, userEvent, within } from "@storybook/test";
import * as React from "react";
import * as MockConfiguration from "../configuration/configuration.mock";
import Storage, { useStorage } from "./index";
import * as MockStorage from "./storage.mock";

export default {
	argTypes: {
		conf: {
			control: "object",
			description: "The applications configuration object, specifically the application part of it."
		},
	},
	component: Storage.Provider,
	title: "Storage",
};

export const Default = (args) => (
	<Storage.Provider {...args}>
		<MockStorage.TestComponent />
	</Storage.Provider>
);
Default.args = {
	conf: MockConfiguration.mockConf.application,
};
Default.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);

	// Check if the initial storage state is as expected
	const initialStorage = await canvas.findByTestId("mock-storage");
	expect(initialStorage).toBeTruthy();

	// 1. Find the button to send to storage
	const sendButton = await canvas.findByRole('button', { name: /send to storage/i });
	// 2. Click the button to send value to storage
	await userEvent.click(sendButton);
	// 3. After clicking, verify that the storage state has been updated
	const updatedDataDisplay = await canvas.findByText(/"test": "value"/);
	expect(updatedDataDisplay).toBeInTheDocument();

	// 1. Find the button to remove from storage
	const removeButton = await canvas.findByRole('button', { name: /remove from storage/i });
	// 2. Click the button to remove value from storage
	await userEvent.click(removeButton);
	// 3. After clicking, verify that the storage state has been updated
	const preElement = await canvas.queryByText(/"test": "value"/);
	expect(preElement).not.toBeInTheDocument();
};

// Attempt to use the hook without provider
export const Error = () => {
	const Component = () => {
		try {
			useStorage();
		} catch (error) {
			return <div data-testid="error-message">{error.message}</div>;
		}
		return null; // Render nothing if no error
	};

	return <Component />;
};
Error.args = {};
Error.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);

	const errorMessage = await canvas.findByTestId("error-message");
	expect(errorMessage).toHaveTextContent("useStorage must be used within Storage.Provider!");
};
