import { Flex, Stack, Text, Title } from "@mantine/core";
import type { TablerIconsProps } from "@tabler/icons-react";
import * as str from "@theholocron/utils-string";
import { type TimeOfDay, TIME_OF_DAY_DEFAULT_TEXT } from "../time-of-day/index.ts";
import * as React from "react";

export interface GreetingProps {
	icon?: (props: TablerIconsProps) => JSX.Element;
	what?: string;
	when?: TimeOfDay;
	who: string;
}

export const GREETING_TEST_ID = "greeting";
const ICON_SIZE = 48;

/**
 * A component that displays a personalized greeting message based on the time of day, including a matching icon.
 *
 * @param {GreetingProps} props - The props for the Greeting component.
 * @param {(props: TablerIconsProps) => JSX.Element} props.icon - A Tabler Icon component to visually represent the time of day.
 *   This should be a functional React component that accepts `TablerIconsProps`.
 * @param {string} props.what - The greeting to be used. Defaults to "Good".
 * @param {TimeOfDay} props.when - The time of day being represented (e.g., "morning", "afternoon", "evening").
 *   Defaults to `DEFAULT_TIME_OF_DAY_TEXT`.
 * @param {string} props.who - The name or identifier of the user to greet.
 *
 * @example
 * // Usage with a Tabler icon
 * import { IconSun } from "@tabler/icons-react";
 *
 * <Greeting
 *   icon={IconSun}
 *   what="have a great"
 *   when="morning"
 *   who="John"
 * />;
 *
 * @example
 * // Usage without a custom icon
 * <Greeting
 *   when="evening"
 *   who="Jane"
 * />;
 *
 * @remarks
 * - `gap={0}` in the `Stack` removes the space between the greeting text and the user's name.
 * - `size` is a magic number for the Icon size and can be tweaked as necessary; use regression testing for changes
 * - `stroke` is a design choice meant to make the Icon stand out
 */
export function Greeting (props: GreetingProps) {
	const {
		icon: Icon,
		what = "Good",
		when = TIME_OF_DAY_DEFAULT_TEXT,
		who,
	} = props;

	return (
		<Flex
			// add in classNames library?
			// use sledgehammer?
			// className={classNames}
			data-testid={GREETING_TEST_ID}
			align="center" // StyleProp (inline style)
			justify="space-between" // StyleProp (inline style)
		>
			<Stack gap={0} style={{ flex: 1, maxWidth: `calc(100% - ${ICON_SIZE}px)`}}>
				<Text size="xl">{`${str.toTitleCase(what)} ${str.toTitleCase(when)}`}</Text>
				<Title lineClamp={1}>{who}</Title>
			</Stack>
			{Icon && <Icon size={ICON_SIZE} stroke={1} />}
		</Flex>
	);
}
