import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within, waitFor } from "@storybook/test";
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

export const Default: Story = {
  render: () => {
    const [userData, setUserData] = React.useState<User>({
      name: { first: "", last: "" },
    });

    const handleUserChange = (
      field: keyof User | keyof User["name"],
      value: string | number
    ) => {
      setUserData((prev) => {
        const updated = { ...prev };
        if (field.includes(".")) {
          const [parent, child] = field.split(".");
          (updated[parent as keyof User] as any)[child] = value;
        } else {
          (updated as any)[field] = value;
        }
        return updated;
      });
    };

    return (
      <NameInput
        user={userData}
        index={0}
        onChange={handleUserChange}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

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
};
