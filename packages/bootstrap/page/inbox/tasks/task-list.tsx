import { Container, Group, Paper, Skeleton, Text, Title } from "@mantine/core";
import * as React from "react";
import { Task, type TaskProps } from "./task";
import { ITask } from "./use-tasks";

export interface TaskListProps {
	loading?: boolean;
	tasks: ITask[];
	onTogglePinTask: TaskProps["onTogglePinTask"];
	onArchiveTask: TaskProps["onArchiveTask"];
	onEditTitle: TaskProps["onEditTitle"];
	onDeleteTask: TaskProps["onDeleteTask"];
}

export function TaskList(props: TaskListProps) {
	const {
		loading = false,
		tasks,
		onTogglePinTask,
		onArchiveTask,
		onEditTitle,
		onDeleteTask,
	} = props;

	const events = {
		onTogglePinTask,
		onArchiveTask,
		onEditTitle,
		onDeleteTask,
	};

	const LoadingRow = (
		<Group
			align="center"
			justify="space-between"
			wrap="nowrap"
			gap="xl"
			role="listitem"
			mt={10}
			mb={10}
		>
			<Skeleton ml={10} width={20} height={20} />
			<Skeleton width="100%" height={32} />
			<Skeleton width={28} height={28} />
			<Skeleton mr={10} width={28} height={28} />
		</Group>
	);

	if (loading) {
		return (
			<React.Fragment>
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
			</React.Fragment>
		);
	}

	if (tasks.length === 0) {
		return (
			<Container size={420} my={40}>
				<Paper withBorder shadow="md" p={30} mt={30} radius="md">
					<Title ta="center">You have no tasks</Title>
					<Text c="dimmed" size="sm" ta="center" mt={5}>
						Sit back and relax
					</Text>
				</Paper>
			</Container>
		);
	}

	const tasksInOrder = [
		...tasks.filter((t) => t.state === "TASK_PINNED"),
		...tasks.filter((t) => t.state !== "TASK_PINNED"),
	];

	return (
		<div
			data-testid="success"
			key={"success"}
			role="list"
			aria-label="tasks"
		>
			{tasksInOrder.map((task) => (
				<Task key={task.id} task={task} {...events} />
			))}
		</div>
	);
}
