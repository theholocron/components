import { Group, Text, Button } from "@mantine/core";
import { IconUsers, TablerIconsProps } from "@tabler/icons-react";
import * as React from "react";

interface User {
	name: {
		first: string;
		last: string;
	}
}

	export const useDisplayNames = (users: User[]) => {
	// Check if all users share the same last name, including missing last names
	const hasSameLastName = React.useMemo(() => {
		if (users.length === 0) return true;
		const firstLastName = users[0]?.name.last || "";
		return users.every((user) => user.name.last === firstLastName || !user.name.last);
	}, [users]);

	// Map names based on the same-last-name rule
	const displayNames = React.useMemo(() => {
		return users.map((user) => {
			if (hasSameLastName) {
				return user.name.first; // Only show first names if last names are the same
			}
			return `${user.name.first} ${user.name.last || ""}`.trim(); // Show full name if last names differ
		});
	}, [users, hasSameLastName]);

	// Create the visible names string (first 2 names)
	const visibleNames = React.useMemo(() => displayNames.slice(0, 2).join(", "), [displayNames]);

	// Calculate the remaining count
	const remaining = React.useMemo(() => Math.max(users.length - 2, 0), [users]);

	return {
		count: users.length ?? 0,
		remaining,
		names: visibleNames,
		fullNames: displayNames,
	};
};

interface RelatedNamesProps {
	users: User[];
	icon?: TablerIconsProps; // Optional icon prop
}

export function RelatedNames(props: RelatedNamesProps) {
	const { icon, users } = props;
	const { remaining, names, fullNames } = useDisplayNames(users);

	// State to toggle the full names visibility
	const [showAllNames, setShowAllNames] = React.useState(false);

	const toggleShowNames = () => {
		setShowAllNames((prev) => !prev);
	};

	return (
		<Group gap={5}>
			<IconUsers size={16} {...icon} />
			<Text size={12} inline>{showAllNames ? fullNames.join(", ") : names}</Text>
			{remaining > 0 && (
				<Button variant="transparent" bd={0} fz={12} h={12} p={0} onClick={toggleShowNames}>
					{showAllNames ? "Show less" : `and ${remaining} more`}
				</Button>
			)}
		</Group>
	);
}
