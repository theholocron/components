import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import * as MockConfiguration from "./configuration.mock";
import Configuration, { useConfiguration } from "./index";

const meta: Meta<typeof Configuration> = {
	argTypes: {
		conf: {
			control: "object",
			defaultValue: MockConfiguration.mockConf,
			description: "The applications configuration.",
		},
	},
	component: Configuration.Provider,
	title: "Configuration",
};
export default meta;
type Story = StoryObj<typeof Configuration>;

export const Default: Story = {
	args: {
		conf: MockConfiguration.mockConf,
	},
	render: (args) => (
		<Configuration.Provider {...args}>
			<MockConfiguration.TestComponent />
		</Configuration.Provider>
	),
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
};

// Attempt to use the hook without provider
export const Error: Story = {
	render: () => {
		const Component = () => {
			try {
				useConfiguration();
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
			"useConfiguration must be used within Configuration.Provider!"
		);
	},
};

// Fallback to ID when slug is not present
export const FallbackSlug: Story = Default.bind({});
FallbackSlug.args = {
	conf: {
		...MockConfiguration.mockConf,
		application: {
			...MockConfiguration.mockConf.application,
			name: "",
			id: "fallback-slug",
			slug: "",
		},
	},
};
FallbackSlug.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const appName = await canvas.findByText(/"slug": "fallback-slug"/);
	expect(appName).toBeInTheDocument();
};

// Fallback when only ID is present
export const FallbackTitle: Story = Default.bind({});
FallbackTitle.args = {
	conf: MockConfiguration.mockConf,
};
FallbackTitle.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const appName = await canvas.findByText(/"title": "A Mock Application"/);
	expect(appName).toBeInTheDocument();
};
