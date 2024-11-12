import { Group, Text, Title } from "@mantine/core";
import { IconUserFilled } from "@tabler/icons-react";
import * as React from "react";
import { TaskList, useTasks } from "../tasks";
import { useStorage } from "../../../src/";

export interface InboxProps {
	error?: string;
}

type TaskState = "TASK_PINNED" | "TASK_INBOX";

export function Inbox(props: InboxProps) {
	const { error = "" } = props;
	const storage = useStorage();
	const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

	React.useEffect(() => {
		storage.sendTo("user.isLoggedIn", true);
		setIsLoggedIn(true);
	}, []);

	const [tasks, dispatch] = useTasks();

	// Archive or move the task back to inbox
	const archiveTask = (
		actionType: "ARCHIVE_TASK" | "INBOX_TASK",
		id: string
	) => {
		dispatch({ type: actionType, id });
	};

	// Delete task by id
	const deleteTask = (id: string) => {
		dispatch({ type: "DELETE_TASK", id });
	};

	// Toggle between pinning and unpinning the task
	const togglePinTask = (state: TaskState, id: string) => {
		dispatch({
			type: state === "TASK_PINNED" ? "INBOX_TASK" : "PIN_TASK",
			id,
		});
	};

	// Edit task title
	const editTitle = (title: string, id: string) => {
		dispatch({ type: "EDIT_TITLE", id, title });
	};

	if (error) {
		return (
			<div className="page lists-show">
				<div className="wrapper-message">
					<span className="icon-face-sad" />
					<p className="title-message">Oh no!</p>
					<p className="subtitle-message">Something went wrong</p>
				</div>
			</div>
		);
	}

	return (
		<div className="page lists-show">
			<Group justify="space-between" pr={15}>
				<Title p={10}>Taskbox</Title>
				<Text>{isLoggedIn && <IconUserFilled />}</Text>
			</Group>
			<TaskList
				tasks={tasks}
				onArchiveTask={archiveTask}
				onTogglePinTask={togglePinTask}
				onEditTitle={editTitle}
				onDeleteTask={deleteTask}
			/>
		</div>
	);
}
