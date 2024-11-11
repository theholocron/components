import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { type Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";

// Initialize MSW
initialize({ onUnhandledRequest: "bypass" });

const preview: Preview = {
	// layout: "centered",
	loaders: [mswLoader],
	parameters: {
		codesandbox: {
			apiToken: process.env.STORYBOOK_CODE_SANDBOX_API_TOKEN,
			template: "react",
			privacy: "public",
		},
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
		nextjs: { appDirectory: true },
		test: {
			// This is needed until Next will update to the React 19 beta: https://github.com/vercel/next.js/pull/65058
			// In the React 19 beta ErrorBoundary errors (such as redirect) are only logged, and not thrown.
			dangerouslyIgnoreUnhandledErrors: true,
		},
		viewport: {
			viewports: INITIAL_VIEWPORTS,
			// defaultViewport: 'ipad',
		},
	},
	tags: ["autodocs"],
};

export default preview;
