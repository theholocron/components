import type { Meta, StoryObj } from "@storybook/react";
import { Task } from "./task";

const meta: Meta<typeof Task> = {
	component: Task,
	title: "Task",
	argTypes: {
		onArchiveTask: { action: "onArchiveTask" },
		onTogglePinTask: { action: "onTogglePinTask" },
		onEditTitle: { action: "onEditTitle" },
		onDeleteTask: { action: "onDeleteTask" },
	},
};
export default meta;
type Story = StoryObj<typeof Task>;

export const Default: Story = {
	render: (args) => (
		<ul>
			<Task {...args} />
		</ul>
	),
	args: {
		task: {
			id: "1",
			title: "Buy milk",
			state: "TASK_INBOX",
		},
	},
};

export const Pinned: Story = {
	render: (args) => (
		<ul>
			<Task {...args} />
		</ul>
	),
	args: {
		task: {
			id: "2",
			title: "QA dropdown",
			state: "TASK_PINNED",
		},
	},
};

export const Archived: Story = {
	render: (args) => (
		<ul>
			<Task {...args} />
		</ul>
	),
	args: {
		task: {
			id: "3",
			title: "Write schema for account menu",
			state: "TASK_ARCHIVED",
		},
	},
};

const longTitleString: string = `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not!`;

export const LongTitle: Story = {
	args: {
		task: {
			id: "4",
			title: longTitleString,
			state: "TASK_INBOX",
		},
	},
	render: (args) => (
		<ul>
			<Task {...args} />
		</ul>
	),
};
