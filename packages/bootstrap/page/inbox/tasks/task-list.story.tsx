import type { Meta, StoryObj } from "@storybook/react";
import TaskStories from "./task.story";
import { mockTasks } from "./task-list.mock";
import { TaskList } from "./task-list";

const meta = {
	component: TaskList,
	title: "TaskList",
	argTypes: {
		...TaskStories.argTypes,
	},
} satisfies Meta<typeof TaskList>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		tasks: mockTasks,
		onTogglePinTask: () => {},
		onArchiveTask: () => {},
		onEditTitle: () => {},
		onDeleteTask: () => {},
	},
} satisfies Story;

export const WithPinnedTasks = {
	args: {
		...Default.args,
		tasks: [
			{
				id: "6",
				title: "Draft monthly blog to customers",
				state: "TASK_PINNED",
			},
			...(Default.args && Default.args.tasks
				? Default.args.tasks.slice(0, 5)
				: []),
		],
	},
} satisfies Story;

export const Loading = {
	args: {
		...Default.args,
		tasks: [],
		loading: true,
	},
} satisfies Story;

export const Empty = {
	args: {
		...Loading.args,
		loading: false,
	},
} satisfies Story;
