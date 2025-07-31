import { Flex, Stack, Text, Title } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, findByRole, userEvent, waitFor, within } from "@storybook/test";
import * as React from "react";
import { TimeOfDayText, TimeOfDayIcon } from "./index.ts";

const meta = {
	argTypes: {
		date: {
			control: { type: "select" },
			options: [ "Morning", "Afternoon", "Evening" ],
			mapping: {
				Morning: new Date(new Date().setHours(5, 0, 0, 0)),
				Afternoon: new Date(new Date().setHours(12, 0, 0, 0)),
				Evening: new Date(new Date().setHours(19, 0, 0, 0)),
			},
		},
	},
	decorators: [
		(Story, { args }) => (
			<Flex
				align="center"
				justify="space-between"
			>
				<Stack gap={0}>
					<Text data-testid="mock-greeting" tt="capitalize" size="xl">
						Good <Story />
					</Text>
					<Title>User</Title>
				</Stack>
				<TimeOfDayIcon
					date={args.date}
					size={48}
					stroke={1}
				/>
			</Flex>
		),
	],
	component: TimeOfDayText,
	title: "Display/TimeOfDay",
} satisfies Meta<typeof DeleteRow>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Morning = {
	args: {
		date: new Date(new Date().setHours(5, 0, 0, 0)),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const greetingText = await canvas.findByText("Good morning");
		expect(greetingText).toBeInTheDocument();
	},
} satisfies Story;

export const Afternoon = {
	args: {
		date: new Date(new Date().setHours(12, 0, 0, 0)),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const greetingText = await canvas.findByText("Good afternoon");
		expect(greetingText).toBeInTheDocument();
	},
} satisfies Story;

export const Evening = {
	args: {
		date: new Date(new Date().setHours(19, 0, 0, 0)),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const greetingText = await canvas.findByText("Good evening");
		expect(greetingText).toBeInTheDocument();
	},
} satisfies Story;
