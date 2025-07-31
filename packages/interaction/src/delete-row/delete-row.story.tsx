import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { expect, fn, findByRole, waitFor } from "storybook/test";
import { DeleteRow } from "./index.ts";

const meta = {
	argTypes: {
		children: {
			description: "An element to be removed",
		},
		id: {
			description: "A unique identifier to target removal",
		},
		label: {
			defaultValue: "Remove",
			description: "The label for accessibility",
		},
		onRemove: {
			action: "onRemove",
			description: "Function to call with an ID to remove",
		},
	},
	parameters: {
		controls: { exclude: ["align", "gap", "wrap" ]},
	},
	args: {
		onRemove: fn(),
	},
	component: DeleteRow,
	title: "Interactions/DeleteRow",
} satisfies Meta<typeof DeleteRow>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Simple = {
	args: {
		align: "center",
		children: "A row of stuff",
		"data-testid": "mock-remove-row",
		gap: 20,
		id: 1,
		wrap: "nowrap",
	},
	play: async ({ args, canvas, userEvent }) => {
		const childEl = await canvas.findByTestId(args["data-testid"]);
		expect(childEl).toBeInTheDocument();

		const removeBtn = await findByRole(childEl, "button");
		await userEvent.click(removeBtn)
		await waitFor(() => expect(args.onRemove).toHaveBeenCalled());
	},
} satisfies Story;

export const Advanced = {
	args: {
		align: "end",
		gap: 20,
		wrap: "nowrap",
	},
	parameters: {
		controls: { exclude: [...meta.parameters.controls.exclude, "children", "id", "label" ]},
	},
	render: (args) => {
		const [rows, setRows] = React.useState([
			{ id: 1, text: "Row 1" },
			{ id: 2, text: "Row 2" }
		]);

		const handleRemove = (id: number) => {
			setRows(rows.filter((row) => row.id !== id));
		};

		return (
			<React.Fragment>
				{rows.map((row) => (
					<DeleteRow
						{...args}
						key={row.id}
						data-testid={`row-${row.id}`}
						id={row.id}
						onRemove={handleRemove}
					>
						{row.text}
					</DeleteRow>
				))}
			</React.Fragment>
		);
	},
	play: async ({ canvas, userEvent }) => {
		// Verify the first row is present
		const firstRow = await canvas.findByTestId("row-1");
		expect(firstRow).toBeInTheDocument();

		const secondRow = await canvas.findByTestId("row-2");
		expect(secondRow).toBeInTheDocument();

		// Click the delete button for the first row
		const deleteButton = within(firstRow).getByRole("button");
		await userEvent.click(deleteButton);

		// Check if the first row is removed
		expect(await canvas.queryByTestId("row-1")).not.toBeInTheDocument();
		expect(secondRow).toBeInTheDocument();
	},
} satisfies Story;
