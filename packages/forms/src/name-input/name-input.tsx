import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import * as React from "react";

export type User = {
	name: {
		first: string;
		last?: string;
	};
	email?: string;
	age?: number;
};

export interface NameInputProps<T extends Partial<User>> {
	user: T;
	index?: number;
	onChange: (field: keyof T | keyof T["name"], value: string | number, index?: number) => void;
}

export function NameInput<T extends Partial<User>>(props: NameInputProps<T>) {
	const { user, index, onChange } = props;
	const form = useForm({ initialValues: user });

	// Handle input changes and notify the parent
	const handleInputChange = (field: keyof T | keyof T["name"], value: string | number) => {
		onChange(field, value, index);
		// Handle nested fields like `name.first`
		const [parentField, subField] = field.toString().split(".") as [keyof T, keyof T[keyof T]];
		if (subField) {
			form.setFieldValue(`${String(parentField)}.${String(subField)}`, value);
		}
		else {
			form.setFieldValue(field as string, value);
		}
	};

	return (
		<React.Fragment>
			<TextInput
				label="First Name"
				placeholder="Enter first name"
				value={form.values.name?.first || ""}
				onChange={(e) => handleInputChange("name.first", e.target.value)}
			/>

			<TextInput
				label="Last Name"
				placeholder="Enter last name"
				value={form.values.name?.last || ""}
				onChange={(e) => handleInputChange("name.last", e.target.value)}
			/>
		</React.Fragment>
	);
}
