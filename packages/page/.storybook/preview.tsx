import { MantineProvider } from "@mantine/core";
import { type Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

import "@mantine/core/styles.css";

// Initialize MSW
initialize({ onUnhandledRequest: "bypass" });

const preview: Preview = {
	decorators: [
		(Story) => (<MantineProvider><Story /></MantineProvider>),
	],
	layout: "centered",
	loaders: [mswLoader],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		html: {
			prettier: {
				tabWidth: 4,
				useTabs: true,
			},
		},
		viewport: {
			viewports: INITIAL_VIEWPORTS,
			// defaultViewport: 'ipad',
		},
	},
	tags: ["autodocs"],
};

export default preview;
