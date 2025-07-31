import type { Meta, StoryObj } from "@storybook/react";
import { expect, within, userEvent } from "@storybook/test";
import { IconSun } from "@tabler/icons-react";
import { Greeting } from "./index.ts";

const meta = {
	component: Greeting,
	title: "Display/Greeting",
} satisfies Meta<typeof Greeting>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		icon: IconSun,
		when: "Evening",
		who: "John Doe asdfsdfasfasdfsfsdf",
	},
	play: async ({ canvasElement, args }) => {
		// Access the canvas element where the component is rendered
		const canvas = within(canvasElement);

		// Check that the greeting text is rendered correctly
		const greeting = canvas.getByTestId("greeting");
		expect(greeting).toBeInTheDocument();
		expect(greeting).toHaveTextContent("Good");

		// Check that the `who` prop is displayed as a Title
		const title = canvas.getByRole("heading");
		expect(title).toHaveTextContent(args.who);

		// Interact with the component if needed (e.g., simulate clicks)
		const timeIcon = greeting.querySelector("svg.tabler-icon");
		expect(timeIcon).toBeInTheDocument();
	},
} satisfies Story;

// what happens when the wrong icon is passed in; its not a Tabler
// what happens when the wrong enum for when is passed in
