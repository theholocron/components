import * as path from "node:path";
import { codecovVitePlugin } from "@codecov/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const NAME = "bootstrap";

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
			external: ["react", "react-dom"], // Externalize peer dependencies
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},
	},
	plugins: [
		react(),
		codecovVitePlugin({
			enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
			bundleName: NAME,
			gitService: "github",
			uploadToken: process.env.CODECOV_TOKEN,
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"), // Example alias, adjust as needed
		},
	},
	test: {
		globals: true,
		environment: "jsdom", // Use jsdom for testing React components
		setupFiles: "./test.setup.ts", // Optional setup file for additional configurations
	},
});
