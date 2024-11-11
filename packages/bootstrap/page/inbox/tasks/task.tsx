import { ActionIcon, Checkbox, Group, TextInput } from "@mantine/core";
import { IconStar, IconTrash } from "@tabler/icons-react";

export interface TaskProps {
	task: {
		id: string;
		title: string;
		state: "TASK_INBOX" | "TASK_PINNED" | "TASK_ARCHIVED";
	};
	onArchiveTask: (archive: "ARCHIVE_TASK", id: string) => void;
	onTogglePinTask: (
		state: "TASK_INBOX" | "TASK_PINNED" | "TASK_ARCHIVED",
		id: string
	) => void;
	onEditTitle: (title: string, id: string) => void;
	onDeleteTask: (id: string) => void;
}

export function Task(props: TaskProps) {
	const {
		task: { id, title, state },
		onArchiveTask,
		onTogglePinTask,
		onEditTitle,
		onDeleteTask,
	} = props;

	return (
		<Group
			align="center"
			justify="space-between"
			wrap="nowrap"
			gap="xl"
			role="listitem"
			aria-label={`task-${id}`}
		>
			<Checkbox
				type="checkbox"
				aria-label={`archiveTask-${id}`}
				onChange={() => onArchiveTask("ARCHIVE_TASK", id)}
				name="checked"
				id={`archiveTask-${id}`}
				checked={state === "TASK_ARCHIVED"}
				pl={10}
			/>

			<TextInput
				variant="unstyled"
				type="text"
				value={title}
				name="title"
				placeholder="Input title"
				style={{
					textOverflow: "ellipsis",
					width: "100%",
				}}
				onChange={(e) => onEditTitle(e.target.value, id)}
			/>
			<ActionIcon
				variant="transparent"
				onClick={() => onDeleteTask(id)}
				aria-label="delete"
			>
				<IconTrash
					style={{ width: "70%", height: "70%" }}
					stroke={1.5}
				/>
			</ActionIcon>
			{state !== "TASK_ARCHIVED" && (
				<ActionIcon
					variant="transparent"
					onClick={() => onTogglePinTask(state, id)}
					id={`pinTask-${id}`}
					aria-label={state === "TASK_PINNED" ? "unpin" : "pin"}
					key={`pinTask-${id}`}
					mr={10}
				>
					<IconStar
						style={{ width: "70%", height: "70%" }}
						stroke={1.5}
					/>
				</ActionIcon>
			)}
		</Group>
	);
}
