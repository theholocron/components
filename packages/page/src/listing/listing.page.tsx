import * as React from "react";
import { Greeting, Listing, Rando, TimeOfDayIcon, TimeOfDayText, useGetTimeOfDay } from "@theholocron/components-display";
import { AddButton } from "@theholocron/components-interaction";

const users = [
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
];

export function ListingPage (props) {
	const timeOfDay = useGetTimeOfDay(/* props.date */);

	return (
		<React.Fragment>
			<Greeting
				when={timeOfDay}
				who="Newton"
				icon={<TimeOfDayIcon size={48} stroke={1} />}
			/>
			<AddButton fullWidth>Add a Rando</AddButton>
			<Listing
				data={users}
				noun="rando"
				component={Rando}
			/>
		</React.Fragment>
	);
}
