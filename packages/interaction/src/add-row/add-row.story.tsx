import { type ButtonVariant } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, findByRole, waitFor } from "storybook/test";
import { AddRow } from "./index.ts";

const meta = {
	argTypes: {
		children: {
			description: "A React node to be used as the text",
		},
		onClick: {
			action: "onAdd",
			description: "Function to call to add a new row",
		},
		variant: {
			control: { type: "select" },
			options: [
				"filled",
				"light",
				"outline",
				"transparent",
				"white",
				"subtle",
				"default",
				"gradient",
			] as ButtonVariant[],
			description: "Style variations",
		},
	},
	args: {
		children: "Add",
		onClick: fn(),
		variant: "outline",
	},
	component: AddRow,
	title: "Interactions/AddRow",
} satisfies Meta<typeof AddRow>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Simple = {
	args: {
		"data-testid": "mock-add-row",
	},
	play: async ({ args, canvas, step, userEvent }) => {
		const addBtn = await canvas.findByTestId(args["data-testid"]);
		expect(addBtn).toBeInTheDocument();

		await userEvent.click(addBtn)
		await waitFor(() => expect(args.onClick).toHaveBeenCalled());
	},
} satisfies Story;

export const Advanced = {
	args: {
		children: "Add one more",
	},
	render: (args) => {
		const [rows, setRows] = React.useState([0]);
		const [nextId, setNextId] = React.useState(1);

		const handleAddRow = () => {
			setRows((prevRows) => [...prevRows, nextId]);
			setNextId((prevId) => prevId + 1);
		};

		return (
			<React.Fragment>
				{rows.map((id) => (
					<div data-testid={`row-${id}`} key={id}>Row {id}</div>
				))}
				<AddRow mt={10} onClick={handleAddRow}>{args.children}</AddRow>
			</React.Fragment>
		);
	},
	play: async ({ args, canvas, step, userEvent }) => {
		await step("Verify initial row", async () => {
			const initialRow = await canvas.findByTestId("row-0");
			expect(initialRow).toBeInTheDocument();
		});

		await step("Add a new row", async () => {
			const addRowButton = await canvas.findByRole("button", { name: new RegExp(args.children, "i") });
			await userEvent.click(addRowButton);
		});

		await step("Verify new row was added", async () => {
			const newRow = await canvas.findByTestId("row-1");
			expect(newRow).toBeInTheDocument();
		});
	},
} satisfies Story;
