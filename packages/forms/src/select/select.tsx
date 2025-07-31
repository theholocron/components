import { Combobox, type ComboboxProps, InputBase, ScrollArea, useCombobox } from "@mantine/core";
import * as React from "react";

export interface SelectProps extends ComboboxProps {
	canCreate?: boolean;
	label: string;
	options: string[];
	placeholder?: string;
}

export function Select (props: SelectProps) {
	const {
		options,
		canCreate = false,
		label = "",
		placeholder,
		...rest
	} = props;
	const [data, setData] = React.useState(options);
	const [search, setSearch] = React.useState("");
	const [value, setValue] = React.useState<string | null>(null);

	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});

	const exactOptionMatch = data.some((item) => item === search);
	const filteredOptions = exactOptionMatch
		? data
		: data.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()));

	const dataset = filteredOptions.map((item) => (
		<Combobox.Option value={item} key={item}>{item}</Combobox.Option>
	));

	return (
		<Combobox
			{...rest}
			store={combobox}
			withinPortal={false}
			onOptionSubmit={(val) => {
				if (canCreate && val === "$create") {
					setData((current) => [...current, search]);
					setValue(search);
				}
				else {
					setValue(val);
					setSearch(val);
				}

				combobox.closeDropdown();
			}}
		>
			<Combobox.Target>
				<InputBase
					rightSection={<Combobox.Chevron />}
					label={label}
					value={search}
					onChange={(event) => {
						combobox.openDropdown();
						combobox.updateSelectedOptionIndex();
						setSearch(event.currentTarget.value);
					}}
					onClick={() => combobox.openDropdown()}
					onFocus={() => combobox.openDropdown()}
					onBlur={() => {
						combobox.closeDropdown();
						setSearch(value || "");
					}}
					placeholder={placeholder}
					rightSectionPointerEvents="none"
				/>
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Options>
					<ScrollArea.Autosize type="scroll" mah={200}>
						{dataset}
						{!exactOptionMatch && canCreate && search.trim().length > 0 && (
							<Combobox.Option value="$create">+ Create {search}</Combobox.Option>
						)}
					</ScrollArea.Autosize>
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}
