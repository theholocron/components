import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import * as MockEnvironment from "./environment.mock";
import Environment, { useEnvironment } from "./index";

const meta: Meta<typeof Environment> = {
	component: Environment.Provider,
	title: "Environment",
};
export default meta;
type Story = StoryObj<typeof Environment>;

export const Default: Story = {
	render: (args) => (
		<Environment.Provider {...args}>
			<MockEnvironment.TestComponent />
		</Environment.Provider>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Expect the displayed environment
		const environmentDisplay = await canvas.findByTestId(
			"environment-display"
		);
		expect(environmentDisplay).toHaveTextContent(
			"Current Environment: development"
		); // Change this based on your mocked environment
	},
};

// Attempt to use the hook without provider
export const Error: Story = {
	render: () => {
		const Component = () => {
			try {
				useEnvironment();
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
			"useEnvironment must be used within Environment.Provider!"
		);
	},
};
