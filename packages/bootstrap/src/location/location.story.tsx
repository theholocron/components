import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import Storage from "../storage/index.ts";
import { Default as StorageDefault } from "../storage/storage.story.tsx";
import Location, { useLocation } from "./index.ts";
import { TestComponent } from "./location.mock.tsx";

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
} satisfies Meta<typeof Location.Provider>;
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
			} catch (error: unknown) {
				return (
					<div data-testid="error-message">
						{(error as Error)?.message}
					</div>
				);
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
