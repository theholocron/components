import * as React from "react";
import { useStorage } from "./storage";

export function TestComponent () {
	const [isSending, setIsSending] = React.useState(true);
	const [data, setData] = React.useState({});
	const storage = useStorage();

	const handleClick = () => {
		if (isSending) {
			storage.sendTo("test", "value");
		} else {
			storage.removeFrom("test");
		}
		setData(storage.getAll());
		setIsSending(!isSending);
	};

	React.useEffect(() => {
		setData(JSON.parse(window.sessionStorage["@theholocron"]));
	}, []);

	return (
		<div data-testid="mock-storage">
			<button
				onClick={handleClick}
				type="button"
			>
				{isSending ? "Send to Storage" : "Remove from Storage"}
			</button>
			<pre>{JSON.stringify(data, null, 4)}</pre>
		</div>
	);
}
