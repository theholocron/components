import { Group, Text } from "@mantine/core";
import { IconCat, IconDog, type TablerIconsProps } from "@tabler/icons-react";
import * as React from "react";

const iconMap = {
	cat: IconCat,
	dog: IconDog,
};

interface PetIconProps extends TablerIconsProps {
	type: keyof typeof iconMap;
}

export function PetIcon (props: PetIconProps) {
	const {
		type,
		...rest
	} = props;
	const Icon = iconMap[type];

	if (!Icon) {
		return null;
	}

	return <Icon {...rest} />;
}

export interface PetProps extends PetIconProps {
	name: string;
}

export function Pet (props: PetProps) {
	const {
		type,
		name,
	} = props;

	return (
		<Group gap={5}>
			<PetIcon size={16} type={type} /> <Text inline size={12}>{name}</Text>
		</Group>
	);
}
