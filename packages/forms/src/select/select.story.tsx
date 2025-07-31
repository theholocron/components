import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, findByRole, within } from "@storybook/test";
import * as React from "react";
import { pets } from "./select.mock.ts";
import { Select } from "./index.ts";

const meta = {
	argTypes: {
		canCreate: {
			description: "Whether or not to create the option, if not found",
		},
		label: {
			description: "The label above the select box",
		},
		options: {
			defaultValue: pets,
			description: "An element to be removed",
		},
		placeholder: {
			description: "A hint provided to the user",
		},
	},
	component: Select,
	title: "Forms/Select",
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		label: "Pets",
		options: pets,
		placeholder: "Select a pet",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const userInput = "🐠 Fish";

		// Locate the input field
		const input = await canvas.findByPlaceholderText(Default.args.placeholder);
		expect(input).toBeInTheDocument();

		// Simulate input an option
		await userEvent.type(input, "Fish");
		expect(await canvas.findByText(userInput)).toBeInTheDocument();

		// Click on the "Fish" option
		await userEvent.click(await canvas.findByText(userInput));
		expect(input).toHaveValue(userInput);
		expect(await canvas.findByText(userInput)).toBeInTheDocument();
	},
} satisfies Story;

export const WithCreation: Story = {
	args: {
		...Default.args,
		canCreate: true,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const missing = "Panda";

		// Locate the input field
		const input = await canvas.findByPlaceholderText(Default.args.placeholder);
		expect(input).toBeInTheDocument();

		// Simulate typing to create a new option
		await userEvent.type(input, missing);
		expect(await canvas.findByText(`+ Create ${missing}`)).toBeInTheDocument();

		// Click on the "+ Create Fish" option
		await userEvent.click(await canvas.findByText(`+ Create ${missing}`));
		expect(input).toHaveValue(missing);

		// Ensure the new option was added to the list
		await userEvent.click(input);
		expect(await canvas.findByText(missing)).toBeInTheDocument();
	},
} satisfies Story;
