import type { Meta, StoryObj } from "@storybook/react";
import { konami } from "@theholocron/utils-misc";
import { expect } from "storybook/test";
import Konami, { useKonami } from "./index";
import * as MockKonami from "./konami.mock";

const meta = {
	component: Konami.Provider,
	title: "Konami",
} satisfies Meta<typeof Konami.Provider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	render: () => (
		<Konami.Provider>
			<MockKonami.TestComponent />
		</Konami.Provider>
	),
	play: async ({ canvas, userEvent }) => {
		// 1. Verify initial state (Konami code has not been entered)
		const component = await canvas.findByTestId("has-entered");
		await expect(component).toHaveTextContent("Not Entered");

		// 2. Simulate each keypress in the Konami Code sequence
		for (const key of konami.CODE) {
			await userEvent.keyboard(key);
		}
		// 3. Verify the updated state (Konami code has been entered)
		await expect(component).toHaveTextContent("Entered");
	},
} satisfies Story;

// Attempt to use the hook without provider
export const Error = {
	render: () => {
		const Component = () => {
			try {
				useKonami();
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
			"useKonami must be used within Konami.Provider!"
		);
	},
} satisfies Story;
