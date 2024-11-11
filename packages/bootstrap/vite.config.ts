import * as path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/*
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/index.ts"), // Entry point of your library
			name: "bootstrap",
			formats: ["es", "cjs"], // Specify formats (ESM and CommonJS)
			fileName: (format) => `bootstrap.${format}.js`,
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
	plugins: [react()],
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