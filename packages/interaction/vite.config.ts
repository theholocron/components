import * as path from "node:path";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import { coverageConfigDefaults, defineConfig } from "vitest/config";

const NAME = "components-interaction";
/*
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/index.ts"), // Entry point of your library
			name: NAME,
			formats: ["es", "cjs"], // Specify formats (ESM and CommonJS)
			fileName: (format) => `${NAME}.${format}.js`,
		},
		rollupOptions: {
			external: ["react", "react-dom", "@mantine/core", "@mantine/hooks"], // Externalize peer dependencies
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},
	},
	plugins: [react(), storybookTest()],
	publicDir: "public",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"), // Example alias, adjust as needed
		},
	},
	test: {
		browser: {
			enabled: true,
			provider: "playwright",
			headless: true,
			instances: [{ browser: "chromium" }],
		},
		coverage: {
			all: false,
			exclude: [
				...coverageConfigDefaults.exclude,
				"**/handlers.*", // msw handlers
				"**/*.{mock}.*",
			],
			provider: "v8",
			reporter: ["text", "lcov"],
		},
		environment: "jsdom",
		globals: true,
		setupFiles: ["./vitest.setup.ts"],
	},
});
