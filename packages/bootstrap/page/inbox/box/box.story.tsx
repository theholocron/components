import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, findByRole, within } from "@storybook/test";
import { http, HttpResponse } from "msw";

import { Default as TaskListDefault } from "../tasks/task-list.story";
import { Inbox } from "./box";

const meta: Meta<typeof Inbox> = {
	component: Inbox,
	title: "Inbox",
};
export default meta;
type Story = StoryObj<typeof Inbox>;

export const Default: Story = {
	parameters: {
		msw: {
			handlers: [
				http.get("/tasks", () =>
					HttpResponse.json(TaskListDefault.args)
				),
			],
		},
	},
};

export const Error: Story = {
	args: {
		error: "Something",
	},
	parameters: {
		msw: {
			handlers: [http.get("/tasks", () => HttpResponse.json([]))],
		},
	},
};

export const PinTask: Story = {
	parameters: {
		...Default.parameters,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const getTask = (id: string) =>
			canvas.findByRole("listitem", { name: id });

		const itemToPin = await getTask("task-4");
		// Find the pin button
		const pinButton = await findByRole(itemToPin, "button", {
			name: "pin",
		});
		// Click the pin button
		await userEvent.click(pinButton);
		// Check that the pin button is now a unpin button
		const unpinButton = within(itemToPin).getByRole("button", {
			name: "unpin",
		});
		await expect(unpinButton).toBeInTheDocument();
	},
};

export const ArchiveTask: Story = {
	parameters: {
		...Default.parameters,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const getTask = (id: string) =>
			canvas.findByRole("listitem", { name: id });

		const itemToArchive = await getTask("task-2");
		const archiveButton = await findByRole(itemToArchive, "button", {
			name: "archiveButton-2",
		});
		await userEvent.click(archiveButton);
	},
};

export const EditTask: Story = {
	parameters: {
		...Default.parameters,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const getTask = (id: string) =>
			canvas.findByRole("listitem", { name: id });

		const itemToEdit = await getTask("task-5");
		const taskInput = await findByRole(itemToEdit, "textbox");
		const inputElement = taskInput as HTMLInputElement;
		await userEvent.type(inputElement, " and disabled state");
		await expect(inputElement.value).toBe(
			"Fix bug in input error state and disabled state"
		);
	},
};

export const DeleteTask: Story = {
	parameters: {
		...Default.parameters,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const getTask = (id: string) =>
			canvas.findByRole("listitem", { name: id });

		const itemToDelete = await getTask("task-1");
		const deleteButton = await findByRole(itemToDelete, "button", {
			name: "delete",
		});

		// Click the pin button
		await userEvent.click(deleteButton);
		await expect(canvas.getAllByRole("listitem").length).toBe(5);
	},
};
