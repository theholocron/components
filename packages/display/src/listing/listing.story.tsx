import { Flex, Stack, Text } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import * as React from "react";
import { Listing } from "./index.ts";
import { Rando } from "../rando/index.ts";

const meta = {
	args: {
		data: [
			{
				location: "1111 Sunset Blvd.",
				name: "Eleanor Sanchez",
				relatedNames: [
					{ name: { first: "Alice", last: "Smith" } },
					{ name: { first: "Bob", last: "Smith" } },
					{ name: { first: "Charlie", last: "Smith" } },
					{ name: { first: "Diana", last: "Smith" } },
				],
			},
			{
				location: "2222 Sunrise Ave.",
				name: "Baz Quux",
			},
		],
		noun: "rando",
		component: Rando,
	},
	component: Listing,
	title: "Display/Listing",
} satisfies Meta<typeof Listing>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Simple = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Check that the total count is displayed correctly
		const totalCount = await canvas.findByText("2");
		expect(totalCount).toBeInTheDocument();

		// Check for a specific user's name
		const userName = await canvas.findByText("Eleanor Sanchez");
		expect(userName).toBeInTheDocument();
	},
} satisfies Story;
