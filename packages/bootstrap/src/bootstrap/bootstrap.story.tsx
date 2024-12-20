import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import * as React from "react";
import * as MockConfiguration from "../configuration/configuration.mock.tsx";
import ConfigurationStory from "../configuration/configuration.story.tsx";
import * as MockLoading from "../loading/loading.mock.tsx";
import LoadingStory from "../loading/loading.story.tsx";
import * as MockBootstrap from "./bootstrap.mock.tsx";
import { Bootstrap } from "./index.ts";

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
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

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
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const childrenElement = await canvas.findByTestId("loader");
		expect(childrenElement).toBeInTheDocument();
	},
} satisfies Story;
