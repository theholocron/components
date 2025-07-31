import { MantineProvider } from "@mantine/core";
import * as React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";

ReactDOM
	.createRoot(document.getElementById("root"))
	.render(
		<React.StrictMode>
			<MantineProvider>
				<App />
			</MantineProvider>
		</React.StrictMode>
	);
