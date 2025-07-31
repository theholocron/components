import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, findByRole, waitFor } from "storybook/test";
import { AddButton } from "./add-button.tsx";

const meta = {
	argTypes: {
		onClick: { action: "clicked" },
		onError: { action: "error" },
	},
	args: {
		onClick: fn(),
		onError: fn(),
		fullWidth: true,
	},
	component: AddButton,
	title: "Interactions/AddButton",
} satisfies Meta<typeof AddButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const OnSuccess = {
	args: {
		children: "Add a Rando",
		onClick: async () => {
			return new Promise<void>((resolve) => {
				setTimeout(() => {
				resolve();
				}, 2000); // Simulate a 2-second operation
			});
		},
	},
	play: async ({ canvas, userEvent }) => {
		// Find and click the button
		const button = await canvas.findByRole("button", { name: /Add a Rando/i });

		const plusIcon = button.querySelector("svg.tabler-icon-plus");
		expect(plusIcon).toBeInTheDocument();

		await userEvent.click(button);

		// Expect loading state to be visible
		expect(button).toBeDisabled(); // Button should be disabled during loading
		expect(button).toHaveAttribute("data-loading", "true");

		const loader = button.querySelector(".mantine-Button-loader");
		expect(loader).toBeInTheDocument();

		// Wait for success state
		await waitFor(() => {
			const successIcon = button.querySelector("svg.tabler-icon-check");
			expect(successIcon).toBeInTheDocument();
		}, { timeout: 5000 });

		// Wait for the button to return to its default state
		await waitFor(() => {
			// Ensure the button's text is back to its default state
			expect(button).toHaveTextContent("Add a Rando");

			// Ensure the default icon is restored
			const defaultIcon = button.querySelector("svg.tabler-icon-plus");
			expect(defaultIcon).toBeInTheDocument();

			// Ensure the success icon is no longer present
			const successIcon = button.querySelector("svg.tabler-icon-check");
			expect(successIcon).not.toBeInTheDocument();
		}, { timeout: 6000 }); // Timeout matches your success duration
	},
} satisfies Story;

export const OnError = {
	args: {
		children: "Add a Rando",
		onClick: async () => {
			return new Promise<void>((_resolve, reject) => {
				setTimeout(() => {
				reject(new Error("Simulated error!"));
				}, 2000);
			});
		},
		onError: fn(),
	},
	play: async ({ args, canvas, userEvent }) => {
		// Find and click the button
		const button = await canvas.findByRole("button", { name: /Add a Rando/i });

		const plusIcon = button.querySelector("svg.tabler-icon-plus");
		expect(plusIcon).toBeInTheDocument();

		await userEvent.click(button);

		// Expect loading state to be visible
		expect(button).toBeDisabled(); // Button should be disabled during loading
		expect(button).toHaveAttribute("data-loading", "true");

		const loader = button.querySelector(".mantine-Button-loader");
		expect(loader).toBeInTheDocument();

		// Wait for the error state
		await waitFor(() => {
			expect(args.onError).toHaveBeenCalled();
		}, { timeout: 5000 });

		// Wait for the button to return to its default state
		await waitFor(() => {
			// Ensure the button's text is back to its default state
			expect(button).toHaveTextContent("Add a Rando");

			// Ensure the default icon is restored
			const defaultIcon = button.querySelector("svg.tabler-icon-plus");
			expect(defaultIcon).toBeInTheDocument();

			// Ensure the success icon is no longer present
			const successIcon = button.querySelector("svg.tabler-icon-check");
			expect(successIcon).not.toBeInTheDocument();
		}, { timeout: 6000 }); // Timeout matches your success duration
	},
} satisfies Story;
