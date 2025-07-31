import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";
import { expect, findByRole, within } from "storybook/test";

import { Default as TaskListDefault } from "../tasks/task-list.story";
import { Inbox } from "./box";

const meta = {
	component: Inbox,
	title: "Inbox",
} satisfies Meta<typeof Inbox>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	parameters: {
		msw: {
			handlers: [
				http.get("/tasks", () =>
					HttpResponse.json(TaskListDefault.args)
				),
			],
		},
	},
} satisfies Story;

export const Error = {
	args: {
		error: "Something",
	},
	parameters: {
		msw: {
			handlers: [http.get("/tasks", () => HttpResponse.json([]))],
		},
	},
} satisfies Story;

export const PinTask = {
	parameters: {
		...Default.parameters,
	},
	play: async ({ canvas, userEvent }) => {
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
} satisfies Story;

export const ArchiveTask = {
	parameters: {
		...Default.parameters,
	},
	play: async ({ canvas, userEvent }) => {
		const getTask = (id: string) =>
			canvas.findByRole("listitem", { name: id });

		const itemToArchive = await getTask("task-2");
		const archiveButton = await findByRole(itemToArchive, "button", {
			name: "archiveButton-2",
		});
		await userEvent.click(archiveButton);
	},
} satisfies Story;

export const EditTask = {
	parameters: {
		...Default.parameters,
	},
	play: async ({ canvas, userEvent }) => {
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
} satisfies Story;

export const DeleteTask = {
	parameters: {
		...Default.parameters,
	},
	play: async ({ canvas, userEvent }) => {
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
} satisfies Story;
