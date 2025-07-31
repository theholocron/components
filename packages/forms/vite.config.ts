import * as path from "node:path";
import * as fs from "fs";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { coverageConfigDefaults, defineConfig } from "vitest/config";

const NAME = "components-form";

// Helper function to dynamically get all entry points
function getEntries(baseDir: string) {
	const entries: Record<string, string> = {};
	const subdirs = fs.readdirSync(baseDir, { withFileTypes: true });

	subdirs.forEach((dir) => {
		if (dir.isDirectory()) {
			const entryPath = path.join(baseDir, dir.name, "index.ts");
			if (fs.existsSync(entryPath)) {
				entries[dir.name] = entryPath; // Use folder name as key
			}
		}
	});

	return entries;
}

const entries = {
	index: path.resolve(__dirname, "src/index.ts"), // Main entry point
	...getEntries(path.resolve(__dirname, "src")), // Dynamically detect submodule entries
};

export default defineConfig({
	build: {
		lib: {
			entry: entries,
			name: NAME,
			formats: ["es", "cjs"], // Output ES and CJS formats
		},
		rollupOptions: {
			external: ["react", "react-dom", "@mantine/core", "@mantine/form", "@mantine/hooks"],
			output: {
				entryFileNames: (chunkInfo) => {
					if (chunkInfo.name === "index") {
						return `${NAME}.[format].js`; // Main entry
					}
					return `${chunkInfo.name}/index.[format].js`; // Submodules
				},
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},
	},
	plugins: [
		react(),
		dts({
		include: ["src/**/*.ts", "src/**/*.tsx"],
		outDir: "dist",
		rollupTypes: true,
		}),
		storybookTest()
	],
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
