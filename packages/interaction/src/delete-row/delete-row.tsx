import { ActionIcon, Flex, useMantineTheme } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import * as React from "react";

export interface DeleteRowProps {
	children: React.ReactNode;
	iconSize?: number;
	id: number;
	label?: string;
	onRemove: (id: number) => void;
}

export function DeleteRow(props: DeleteRowProps) {
	const {
		children,
		iconSize,
		id,
		label = "Remove",
		onRemove,
		...rest
	} = props;
	const theme = useMantineTheme();
	console.log({ theme })

	return (
		<Flex {...rest}>
			{children}
			<ActionIcon
				aria-label={label}
				color={theme.colors.red[8]}
				onClick={() => onRemove(id)}
				size="lg"
			>
				<IconTrash size={iconSize} />
			</ActionIcon>
		</Flex>
	);
}
