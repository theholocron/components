import { Stack, Flex, Text } from "@mantine/core";
import * as str from "@theholocron/utils-string";
import * as React from "react";

export interface ListingProps<T> {
	data: T[];
	noun: string;
	component: React.ComponentType<T>;
}

export function Listing<T>(props: ListingProps<T>) {
	const {
		data,
		noun,
		component: Component,
	} = props;

	return (
		<Stack>
			<Flex gap={4} justify="flex-end">
				<Text fw={900} size={12} inline>{data.length}</Text>
				<Text size={12} inline>{str.toPlural(data.length, noun)}</Text>
			</Flex>
			<Stack gap={24}>
				{data.map((item, index) => <Component key={index} {...item} />)}
			</Stack>
		</Stack>
	);
}
