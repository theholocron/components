import type { Meta, StoryObj } from "@storybook/react";
import { expect, waitFor } from "@storybook/test";
import * as React from "react";
import { NameInput, User } from "./index.ts";

const meta = {
	argTypes: {
		user: {
			control: { type: "object" },
			description: "The user object containing name and other details",
			defaultValue: { name: { first: "", last: "" } },
		},
		index: {
			control: { type: "number" },
			description: "Optional index to identify the form instance",
		},
		onChange: {
			action: "onChange",
			description: "Function to call when a field value changes",
		},
	},
	component: NameInput,
	title: "Forms/NameInput",
} satisfies Meta<typeof NameInput>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	render: () => {
		const [userData, setUserData] = React.useState<User>({
			name: { first: "", last: "" },
		});

		const handleUserChange = (field: keyof User | "name.first" | "name.last", value: string | number) => {
			setUserData((prev: User) => {
				if (field === "name.first" || field === "name.last") {
					const key = field.split(".")[1] as keyof User["name"];
					return {
						...prev,
						name: {
							...prev.name,
							[key]: value,
						},
					};
				}

				return {
					...prev,
					[field]: value,
				};
			});
		};

		return <NameInput user={userData} index={0} onChange={handleUserChange} />;
	},
	play: async ({ canvas, userEvent }) => {
		// Find the first name input and type a value
		const firstNameInput = canvas.getByLabelText("First Name");
		await userEvent.clear(firstNameInput);
		await userEvent.type(firstNameInput, "John");

		// Find the last name input and type a value
		const lastNameInput = canvas.getByLabelText("Last Name");
		await userEvent.clear(lastNameInput);
		await userEvent.type(lastNameInput, "Doe");

		// Wait for the inputs to have the correct values
		await waitFor(() => {
			expect(firstNameInput).toHaveValue("John");
			expect(lastNameInput).toHaveValue("Doe");
		});
	},
} satisfies Story;
