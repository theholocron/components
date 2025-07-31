import { Anchor, Avatar, Flex, Group, Stack, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import * as React from "react";
import { Pet } from "../pet/index.ts";
import { RelatedNames } from "../related-names/index.ts";

export function Rando (props) {
	const {
		component,
		name,
		location,
		relatedNames,
	} = props;

	return (
		<Anchor component={component} underline="never">
			<Group align="start">
				<Avatar
					color="initials"
					name={name}
					radius="sm"
					size="lg"
				/>
				<Stack gap={5}>
					{location && <Text size={12} inline>{location}</Text>}
					<Text size={18} inline>{name}</Text>
					{relatedNames && <RelatedNames users={relatedNames} />}
					<Pet type="dog" name="Max" />
				</Stack>
				<Flex flex={1} justify="end" style={{ alignSelf: "center" }}>
					<IconChevronRight size="1.5rem" stroke={1.5} className="mantine-rotate-rtl" />
				</Flex>
			</Group>
		</Anchor>
	);
}
