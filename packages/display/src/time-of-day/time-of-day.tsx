import { IconMoon, IconSunrise, IconSun, type TablerIconsProps } from "@tabler/icons-react";
import { getTimeOfDay } from "@theholocron/utils-date-time";
import * as React from "react";

export type TimeOfDay = "Morning" | "Afternoon" | "Evening" | "Day";
export const TIME_OF_DAY_DEFAULT_TEXT = "Day";

export function useGetTimeOfDay (date: Date) {
	const [timeOfDay, setTimeOfDay] = React.useState<string>(TIME_OF_DAY_DEFAULT_TEXT);

	React.useEffect(() => {
		setTimeOfDay(getTimeOfDay(date ?? new Date()));
	}, [date]);

	return timeOfDay;
}

export interface TimeOfDayIconProps extends TablerIconsProps {
	date?: Date;
}

export function TimeOfDayIcon (props: TimeOfDayIconProps) {
	const { date, ...rest } = props;
	const timeOfDay = useGetTimeOfDay(date);

	if (timeOfDay === "morning") {
		return <IconSunrise {...rest} />;
	}

	if (timeOfDay === "afternoon") {
		return <IconSun {...rest} />;
	}

	return <IconMoon {...rest} />;
}
