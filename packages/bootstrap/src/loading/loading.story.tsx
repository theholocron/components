import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { delay, http, HttpResponse } from "msw";
import * as MockLoading from "./loading.mock";
import Loading, { useLoading } from "./index";

const meta: Meta<typeof Loading> = {
	argTypes: {
		loader: {
			control: "object",
			defaultValue: MockLoading.Loader,
			description: "Loader component",
		},
	},
	component: Loading.Provider,
	title: "Loading",
};
export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {
	args: {
		loader: MockLoading.Loader,
	},
	parameters: {
		msw: {
			handlers: [
				http.get("/api/data", async () => {
					await delay(2000);
					return HttpResponse.json({ message: "Success" });
				}),
			],
		},
	},
	render: (args) => (
		<Loading.Provider {...args}>
			<MockLoading.TestComponent />
		</Loading.Provider>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const fetchButton = await canvas.getByText("Fetch Data");

		// Simulate clicking the button
		await userEvent.click(fetchButton);

		// Expect the loader to be displayed
		const loader = await canvas.findByTestId("loader"); // Assuming your Loader component has this test ID
		expect(loader).toBeInTheDocument();

		// Wait for 2 seconds to simulate loading time
		await new Promise((resolve) => setTimeout(resolve, 3000));

		// Check that the loader is removed after loading
		expect(loader).not.toBeInTheDocument();
	},
};

// Attempt to use the hook without provider
export const Error: Story = {
	render: () => {
		const Component = () => {
			try {
				useLoading();
			} catch (error) {
				return <div data-testid="error-message">{error.message}</div>;
			}
			return null; // Render nothing if no error
		};

		return <Component />;
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const errorMessage = await canvas.findByTestId("error-message");
		expect(errorMessage).toHaveTextContent(
			"useLoading must be used within Loading.Provider!"
		);
	},
};
