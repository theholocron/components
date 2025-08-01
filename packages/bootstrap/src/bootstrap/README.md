# Bootstrap Component

A component to bootstrap an application.

## Usage

```typescript
import { type ApplicationConf, Bootstrap } from "@theholocron/bootstrap";
import * as React from "react";

interface BootstrapProps {
	Component: React.ReactNode;
	pageProps?: any;
}

export default function App (props: AppProps) {
	const { Component, pageProps } = props;
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const conf = {
		application: {
			description: "This is a description for a mock application.",
			id: "mock-app-id",
			name: "A Mock Application",
			get slug(): string {
				return this.id;
			},
		},
	};

	return (
		<Bootstrap
			conf={conf}
			isLoading={isLoading}
			setLoading={setIsLoading}
		>
			<Component {...pageProps} />
		</Bootstrap>
	);
}
```
