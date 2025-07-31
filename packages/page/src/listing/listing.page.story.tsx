import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import * as React from "react";
import { ListingPage } from "./listing.page.tsx";

const meta = {
	component: ListingPage,
	title: "Pages/Listing",
} satisfies Meta<typeof ListingPage>;
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
