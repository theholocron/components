import { expect, userEvent, within } from "@storybook/test";
import { delay, http, HttpResponse } from "msw";
import * as React from "react";
import * as MockLoading from "./loading.mock";
import Loading, { useLoading } from "./index";

export default {
	argTypes: {
		loader: {
			control: "object",
			defaultValue: MockLoading.Loader,
			description: "Loader component"
		},
	},
	component: Loading.Provider,
	title: "Loading",
};

export const Default = (args) => (
    <Loading.Provider {...args}>
        <MockLoading.TestComponent />
    </Loading.Provider>
);
Default.args = {
	loader: MockLoading.Loader,
};
Default.parameters = {
	msw: {
		handlers: [
			http.get("/api/data", async () => {
				await delay(2000);
				return HttpResponse.json({ message: "Success" });
			}),
		],
	},
};
Default.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fetchButton = await canvas.getByText("Fetch Data");

    // Simulate clicking the button
    await userEvent.click(fetchButton);

    // Expect the loader to be displayed
    const loader = await canvas.findByTestId("loader"); // Assuming your Loader component has this test ID
    expect(loader).toBeInTheDocument();

    // Wait for 2 seconds to simulate loading time
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Check that the loader is removed after loading
    expect(loader).not.toBeInTheDocument();
};

// Attempt to use the hook without provider
export const Error = () => {
	const Component = () => {
		try {
			useLoading();
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
	expect(errorMessage).toHaveTextContent("useLoading must be used within Loading.Provider!");
};
