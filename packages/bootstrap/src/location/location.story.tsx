import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import Storage from "../storage";
import { Default as StorageDefault } from "../storage/storage.story";
import Location, { useLocation } from "./index";
import { TestComponent } from "./location.mock";

const meta: Meta<typeof Location> = {
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
export default meta;
type Story = StoryObj<typeof Location>;

export const Default: Story = {
	render: () => (
		<Location.Provider>
			<TestComponent />
		</Location.Provider>
	),
};

// Attempt to use the hook without provider
export const Error: Story = {
	render: () => {
		const Component = () => {
			try {
				useLocation();
			} catch (error) {
				return <div data-testid="error-message">{error.message}</div>;
			}
			return null; // Render nothing if no error
		};

		return <Component />;
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const errorMessage = await canvas.findByTestId("error-message");
		expect(errorMessage).toHaveTextContent(
			"useLocation must be used within a Location.Provider!"
		);
	},
};

/**
 * Utility function for clearing storage in tests
 * @TODO: figure out how to test the following stories
const clearStorage = () => {
	const storage = useStorage();
	storage.clear();
};
*/

export const PermissionDenied: Story = {
	render: () => (
		<Location.Provider>
			<TestComponent />
		</Location.Provider>
	),
};

export const CachedLocation: Story = {
	render: () => (
		<Location.Provider>
			<TestComponent />
		</Location.Provider>
	),
};

export const LocationError: Story = {
	render: () => (
		<Location.Provider>
			<TestComponent />
		</Location.Provider>
	),
};
