import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import * as MockEnvironment from "./environment.mock";
import Environment, { useEnvironment } from "./index";

const meta = {
	component: Environment.Provider,
	title: "Environment",
} satisfies Meta<typeof Environment.Provider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Environment.Provider>
			<MockEnvironment.TestComponent />
		</Environment.Provider>
	),
	play: async ({ canvas }) => {
		// Expect the displayed environment
		const environmentDisplay = await canvas.findByTestId(
			"environment-display"
		);
		expect(environmentDisplay).toHaveTextContent(
			"Current Environment: development"
		); // Change this based on your mocked environment
	},
} satisfies Story;

// Attempt to use the hook without provider
export const Error = {
	render: () => {
		const Component = () => {
			try {
				useEnvironment();
			} catch (error: unknown) {
				return (
					<div data-testid="error-message">
						{(error as Error)?.message}
					</div>
				);
			}
			return null; // Render nothing if no error
		};

		return <Component />;
	},
	play: async ({ canvas }) => {
		const errorMessage = await canvas.findByTestId("error-message");
		expect(errorMessage).toHaveTextContent(
			"useEnvironment must be used within Environment.Provider!"
		);
	},
} satisfies Story;
