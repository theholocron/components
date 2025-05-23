import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import * as MockEnvironment from "./environment.mock.tsx";
import Environment, { useEnvironment } from "./index.ts";

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
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const errorMessage = await canvas.findByTestId("error-message");
		expect(errorMessage).toHaveTextContent(
			"useEnvironment must be used within Environment.Provider!"
		);
	},
} satisfies Story;
