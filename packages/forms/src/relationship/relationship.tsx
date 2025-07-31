import { useForm } from "@mantine/form";
import * as React from "react";
import { Select } from "../select/index.ts";
import { pets } from "../select/select.mock.ts";
import { NameInput } from "../name-input/index.ts";

type RelationshipProps = {
	fields: {
		firstName: string;
		lastName: string;
		relationship: string;
	};
	index: number;
	onChange: (field: string, value: string, index: number) => void;
	label?: string;
	placeholder?: string;
};

export function Relationship(props: RelationshipProps) {
	const {
		fields,
		index,
		onChange,
		label = "Relationship",
		placeholder = "e.g. father, mother, spouse",
	} = props;

	const { firstName, lastName, relationship } = fields;
	const form = useForm({
		initialValues: {
			firstName,
			lastName,
			relationship,
		},
	});

	// Update parent form on value change
	const handleSelectChange = (value: string | null) => {
		const relationshipValue = value ?? "";
		form.setFieldValue("relationship", relationshipValue);
		onChange("relationship", relationshipValue, index);
	};

	return (
		<React.Fragment>
			<Select
				canCreate
				label={label}
				onChange={(value) => {
					form.setFieldValue("relationship", value ?? "");
					handleSelectChange(value ?? "");
				}}
				options={pets}
				placeholder={placeholder}
			/>

			<NameInput
				firstName={firstName}
				index={index}
				lastName={lastName}
				onChange={onChange}
			/>
		</React.Fragment>
	);
}
