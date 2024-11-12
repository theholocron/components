import type { Meta, StoryObj } from "@storybook/react";
import * as TaskStories from "./task.story";
import { TaskList } from "./task-list";

const meta: Meta<typeof TaskList> = {
	component: TaskList,
	title: "TaskList",
	argTypes: {
		...TaskStories.default.argTypes,
	},
};
export default meta;
type Story = StoryObj<typeof TaskList>;

export const Default: Story = {
	args: {
		tasks: [
			{ id: "1", state: "TASK_INBOX", title: "Build a date picker" },
			{ id: "2", state: "TASK_INBOX", title: "QA dropdown" },
			{
				id: "3",
				state: "TASK_INBOX",
				title: "Write a schema for account avatar component",
			},
			{ id: "4", state: "TASK_INBOX", title: "Export logo" },
			{
				id: "5",
				state: "TASK_INBOX",
				title: "Fix bug in input error state",
			},
			{
				id: "6",
				state: "TASK_INBOX",
				title: "Draft monthly blog to customers",
			},
		],
	},
};

export const WithPinnedTasks: Story = {
	args: {
		tasks: [
			{
				id: "6",
				title: "Draft monthly blog to customers",
				state: "TASK_PINNED",
			},
			...(Default.args || { tasks: [] }).tasks.slice(0, 5),
		],
	},
};

export const Loading: Story = {
	args: {
		tasks: [],
		loading: true,
	},
};

export const Empty: Story = {
	args: {
		...Loading.args,
		loading: false,
	},
};
