import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { expect } from "storybook/test";
import * as MockConfiguration from "../configuration/configuration.mock";
import ConfigurationStory from "../configuration/configuration.story";
import * as MockLoading from "../loading/loading.mock";
import LoadingStory from "../loading/loading.story";
import * as MockBootstrap from "./bootstrap.mock";
import { Bootstrap } from "./index";

const meta = {
	argTypes: {
		conf: ConfigurationStory.argTypes,
		loader: LoadingStory.argTypes,
	},
	component: Bootstrap,
	title: "Bootstrap",
} satisfies Meta<typeof Bootstrap>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		conf: MockConfiguration.mockConf,
		loader: MockLoading.Loader,
	},
	render: (args) => (
		<Bootstrap {...args}>
			<MockConfiguration.TestComponent />
		</Bootstrap>
	),
	play: async ({ canvas }) => {

		const childrenElement = await canvas.findByTestId("mock-configuration");
		expect(childrenElement).toBeInTheDocument();
	},
} satisfies Story;

export const IsLoading = {
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
	play: async ({ canvas }) => {
		const childrenElement = await canvas.findByTestId("loader");
		expect(childrenElement).toBeInTheDocument();
	},
} satisfies Story;
