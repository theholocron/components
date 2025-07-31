import { type StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
	addons: [
		"@storybook/addon-a11y",
		"@storybook/addon-coverage",
		"@storybook/addon-designs",
		"@storybook/addon-docs",
		"@storybook/addon-links",
		"@storybook/addon-themes",
		"@storybook/addon-vitest",
		"@chromatic-com/storybook",
	],
	docs: {
		defaultName: "Documentation",
	},
	features: {
		experimentalRSC: true,
	},
	framework: "@storybook/nextjs-vite",
	staticDirs: ["../public"],
	stories: ["../src/**/*.mdx", "../src/**/*.story.@(js|jsx|mjs|ts|tsx)"],
};

export default config;
