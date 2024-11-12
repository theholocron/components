import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import Storage from "../storage";
import { Default as StorageDefault } from "../storage/storage.story";
import Location, { useLocation } from "./index";
import { TestComponent } from "./location.mock";

const meta = {
	component: Location.Provider,
	title: "Location",
	decorators: [
		(Story) => (
			<Storage.Provider {...StorageDefault.args}>
				<Story />
			</Storage.Provider>
		),
	],
} satisfies Meta<typeof Location>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	render: () => (
		<Location.Provider>
			<TestComponent />
		</Location.Provider>
	),
} satisfies Story;

// Attempt to use the hook without provider
export const Error = {
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
} satisfies Story;

// Utility function for clearing storage in tests
// @TODO: figure out how to test the following stories
/*
const clearStorage = () => {
	const storage = useStorage();
	storage.clear();
};
*/

export const PermissionDenied = {
	render: () => (
		<Location.Provider>
			<TestComponent />
		</Location.Provider>
	),
} satisfies Story;

export const CachedLocation = {
	render: () => (
		<Location.Provider>
			<TestComponent />
		</Location.Provider>
	),
} satisfies Story;

export const LocationError = {
	render: () => (
		<Location.Provider>
			<TestComponent />
		</Location.Provider>
	),
} satisfies Story;
