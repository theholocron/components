import { Button, type ButtonProps, type ButtonVariant } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import * as React from "react";

// @TODO: add in sizes to the Mantine theme to accomodate icons

export interface AddRowProps extends ButtonProps {
	children: React.ReactNode;
	variant: ButtonVariant;
}

export function AddRow(props: AddRowProps) {
	const {
		children = "Add",
		variant = "outline",
		...rest
	} = props;

	return (
		<Button
			{...rest}
			variant={variant}
		>
			<IconPlus size={16} /> {children}
		</Button>
	);
}
