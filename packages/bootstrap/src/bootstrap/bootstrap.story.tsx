import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import * as React from "react";
import * as MockConfiguration from "../configuration/configuration.mock";
import ConfigurationStory from "../configuration/configuration.story";
import * as MockLoading from "../loading/loading.mock";
import LoadingStory from "../loading/loading.story";
import * as MockBootstrap from "./bootstrap.mock";
import { Bootstrap } from "./index";

const meta: Meta<typeof Bootstrap> = {
	argTypes: {
		conf: ConfigurationStory.argTypes,
		loader: LoadingStory.argTypes,
	},
	component: Bootstrap,
	title: "Bootstrap",
};
export default meta;
type Story = StoryObj<typeof Bootstrap>;

export const Default: Story = {
	args: {
		conf: MockConfiguration.mockConf,
		loader: MockLoading.Loader,
	},
	render: (args) => (
		<Bootstrap {...args}>
			<MockConfiguration.TestComponent />
		</Bootstrap>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const childrenElement = await canvas.findByTestId("mock-configuration");
		expect(childrenElement).toBeInTheDocument();
	},
};

export const IsLoading: Story = {
	args: {
		...Default.args,
	},
	render: (args) => (
		<React.StrictMode>
			<Bootstrap {...args}>
				<MockBootstrap.Loading />
			</Bootstrap>
		</React.StrictMode>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const childrenElement = await canvas.findByTestId("loader");
		expect(childrenElement).toBeInTheDocument();
	},
};
