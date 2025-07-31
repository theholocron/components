import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, findByRole } from "storybook/test";
// import { taskListHandler, taskListErrorHandler } from "../tasks/handlers";
import { AddAdditional } from "./add-additional.tsx";
import { NameForm } from "../form/index.ts";

const meta = {
	component: AddAdditional,
	title: "Interactions/AddAdditional",
} satisfies Meta<typeof AddAdditional>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Simple = {
	args: {
		"data-testid": "mock-add-additional",
	},
	render: (args) => (
		<AddAdditional {...args}>
			{(id) => (
				<div data-testid={`row-${id}`} style={{ flex: 1 }}>Row {id}</div>
			)}
		</AddAdditional>
	),
	play: async ({ canvas, userEvent }) => {
		// Verify the initial row is present
		const initialRow = await canvas.findByTestId("row-0");
		expect(initialRow).toBeInTheDocument();

		// Test adding a new row
		const addRowButton = await canvas.findByRole("button", { name: /add/i });
		await userEvent.click(addRowButton);

		const rows = await canvas.findAllByTestId(/row-/i);
		expect(rows.length).toBe(2);

		// Verify the new row is added
		const newRow = await canvas.findByTestId("row-1");
		expect(newRow).toBeInTheDocument();

		// Test deleting a row
		const deleteButtons = await canvas.findAllByTestId(/mock-add-additional-delete-/i);
		const deleteBtn = await within(deleteButtons[0]).findByRole("button");
		console.log({ deleteBtn })
		await userEvent.click(deleteBtn);

		// Verify the first row is deleted
		expect(canvas.queryByTestId("row-0")).not.toBeInTheDocument();
		expect(canvas.queryByTestId("row-1")).toBeInTheDocument();
	},
} satisfies Story;
