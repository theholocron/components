import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within, waitFor } from "@storybook/test";
import * as React from "react";
import * as NameInputStories from "../name-input/name-input.story.tsx";
import * as SelectStories from "../select/select.story.tsx";
import { pets } from "../select/select.mock.ts";
import { Relationship } from "./index.ts";

const meta = {
	component: Relationship,
	title: "Forms/Relationship",
} satisfies Meta<typeof Relationship>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		label: "Pets",
		placeholder: "Select a pet",
	},
	render: (args) => {
		const [formData, setFormData] = React.useState([
			{ firstName: "", lastName: "", relationship: "" },
		]);

		const handleFormChange = (field: string, value: string, index: number) => {
			const updatedFormData = [...formData];
			updatedFormData[index][field] = value;
			setFormData(updatedFormData);
		};

		return (
			<div>
				{formData.map((fields, index) => (
					<Relationship
						{...args}
						key={index}
						fields={fields}
						index={index}
						onChange={handleFormChange}
					/>
				))}
			</div>
		);
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step("Select a relationship", async () => {
			await SelectStories.Default.play({ canvasElement });
		});
		await step("Input a first and last name", async () => {
			await NameInputStories.Default.play({ canvasElement });
		});
	},
} satisfies Story;
