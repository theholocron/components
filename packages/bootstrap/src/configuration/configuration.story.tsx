import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import * as MockConfiguration from "./configuration.mock";
import Configuration, { useConfiguration } from "./index";

const meta = {
	argTypes: {
		conf: {
			control: "object",
			defaultValue: MockConfiguration.mockConf,
			description: "The applications configuration.",
		},
	},
	component: Configuration.Provider,
	title: "Configuration",
} satisfies Meta<typeof Configuration.Provider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	render: (args) => (
		<Configuration.Provider {...args}>
			<MockConfiguration.TestComponent />
		</Configuration.Provider>
	),
	args: {
		conf: MockConfiguration.mockConf,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Check if the initial storage state is as expected
		const initialStorage = await canvas.findByTestId("mock-configuration");
		expect(initialStorage).toBeTruthy();

		const appId = await canvas.findByText(/"id": "mock-app-id"/);
		expect(appId).toBeInTheDocument();

		const appName = await canvas.findByText(/"name": "A Mock Application"/);
		expect(appName).toBeInTheDocument();
	},
} satisfies Story;

// Attempt to use the hook without provider
export const Error = {
	render: () => {
		const Component = () => {
			try {
				useConfiguration();
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
			"useConfiguration must be used within Configuration.Provider!"
		);
	},
} satisfies Story;

// Fallback to ID when slug is not present
export const FallbackSlug = {
	args: {
		conf: {
			...MockConfiguration.mockConf,
			application: {
				...MockConfiguration.mockConf.application,
				name: "",
				id: "fallback-slug",
				slug: "",
			},
		},
	},
	render: Default.render.bind({}),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const appName = await canvas.findByText(/"slug": "fallback-slug"/);
		expect(appName).toBeInTheDocument();
	},
} satisfies Story;

// Fallback when only ID is present
export const FallbackTitle = {
	args: {
		conf: MockConfiguration.mockConf,
	},
	render: Default.render.bind({}),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const appName = await canvas.findByText(
			/"title": "A Mock Application"/
		);
		expect(appName).toBeInTheDocument();
	},
} satisfies Story;
