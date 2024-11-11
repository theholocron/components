import { expect, within } from "@storybook/test";
import * as React from "react";
import * as MockConfiguration from "../configuration/configuration.mock";
import ConfigurationStory from "../configuration/configuration.story";
import * as MockLoading from "../loading/loading.mock";
import LoadingStory from "../loading/loading.story";
import * as MockBootstrap from "./bootstrap.mock";
import { Bootstrap } from "./index";

export default {
	argTypes: {
		conf: ConfigurationStory.argTypes,
		loader: LoadingStory.argTypes,
	},
	component: Bootstrap,
	title: "Bootstrap",
};

export const Default = (args) => (
	<Bootstrap {...args}>
		<MockConfiguration.TestComponent />
	</Bootstrap>
);
Default.args = {
	conf: MockConfiguration.mockConf,
	loader: MockLoading.Loader,
}
Default.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);

	const childrenElement = await canvas.findByTestId("mock-configuration");
	expect(childrenElement).toBeInTheDocument();
};

export const IsLoading = (args) => (
	<React.StrictMode>
		<Bootstrap {...args}>
			<MockBootstrap.Loading />
		</Bootstrap>
	</React.StrictMode>
);
IsLoading.args = {
	...Default.args
};
IsLoading.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);

	const childrenElement = await canvas.findByTestId("loader");
	expect(childrenElement).toBeInTheDocument();
};
