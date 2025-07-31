import { Stack, useMantineTheme } from "@mantine/core";
import * as React from "react";
import { AddRow } from "../add-row/index.ts";
import { DeleteRow } from "../delete-row/index.ts";

export interface AddAdditionalProps {
	align: string; // find the align type from mantine
	children: (id: number) => React.ReactNode; // We"ll use numbers as unique IDs for rows
};

export function AddAdditional(props: AddAdditionalProps) {
	const {
		align = "end",
		children,
		...rest
	} = props;
	const [rows, setRows] = React.useState([0]); // Start with one row, identified by ID `0`
	const [nextId, setNextId] = React.useState(1); // Counter for unique row IDs
	const theme = useMantineTheme();

	// Add a new row with a unique ID
	const handleAddRow = () => {
		setRows((prevRows) => [...prevRows, nextId]);
		setNextId((prevId) => prevId + 1); // Increment ID for next row
	};

	// Remove a specific row by its ID
	const handleRemoveRow = (id: number) => {
		setRows((prevRows) => prevRows.filter((rowId) => rowId !== id));
	};

	return (
		<Stack gap={theme.spacing.sm} {...rest}>
			{rows.map((id) => (
				<DeleteRow
					key={id}
					align="end"
					data-testid={`${props?.["data-testid"]}-delete-${id}`}
					gap={theme.spacing.md}
					id={id}
					onRemove={handleRemoveRow}
					wrap="nowrap"
				>
					{children(id)}
				</DeleteRow>
			))}
			<AddRow fullWidth mt={theme.spacing.sm} onClick={handleAddRow} />
		</Stack>
	);
}
