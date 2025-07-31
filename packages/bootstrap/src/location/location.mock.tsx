import { useLocation } from "./index";

export function TestComponent() {
	const { location, isLoading } = useLocation();

	if (isLoading) return <div data-testid="loading">Loading...</div>;

	if (location) {
		return (
			<div data-testid="location">
				<p>Latitude: {location.latitude}</p>
				<p>Longitude: {location.longitude}</p>
				<p>Accuracy: {location.accuracy} meters</p>
			</div>
		);
	}

	return <div data-testid="no-location">No location available</div>;
}
