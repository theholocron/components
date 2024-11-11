import { expect, within, userEvent } from "@storybook/test";
import * as React from "react";
import Storage, { useStorage } from "../storage";
import { Default as StorageDefault } from "../storage/storage.story";
import Location, { useLocation } from "./index";
import { TestComponent } from "./location.mock";

export default {
	component: Location.Provider,
	title: "Location",
	decorators: [
        (Story) => (
            <Storage.Provider {...StorageDefault.args}>
                <Story />
			</Storage.Provider>
        ),
    ],
};

// 1. Story: Successful Location Fetch
export const Default = () => (
	<Location.Provider>
		<TestComponent />
	</Location.Provider>
);

// Attempt to use the hook without provider
export const Error = () => {
	const Component = () => {
		try {
			useLocation();
		} catch (error) {
			return <div data-testid="error-message">{error.message}</div>;
		}
		return null; // Render nothing if no error
	};

	return <Component />;
};
Error.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);

	const errorMessage = await canvas.findByTestId("error-message");
	expect(errorMessage).toHaveTextContent("useLocation must be used within a Location.Provider!");
};

// Utility function for clearing storage in tests
const clearStorage = () => {
	const storage = useStorage();
	storage.clear();
};
// 2. Story: Permission Denied
export const PermissionDenied = () => (
	<Location.Provider>
		<TestComponent />
	</Location.Provider>
);

// 3. Story: Cached Location Used
export const CachedLocation = () => (
	<Location.Provider>
		<TestComponent />
	</Location.Provider>
);

// 4. Story: Error Fetching Location
export const LocationError = () => (
	<Location.Provider>
		<TestComponent />
	</Location.Provider>
);
