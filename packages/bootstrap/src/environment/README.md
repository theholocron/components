# Environment Component

A React Provider component for storing an environment.

**Note**: this can be set either via `process.env.ENVIRONMENT` or `process.env.NODE_ENV` or `process.env.NEXT_PUBLIC_ENVIRONMENT`, in that order.

## Usage

```typescript
import { Environment } from "@theholocron/bootstrap";
import * as React from "react";

interface AppProps {
	Component: React.ReactNode;
	pageProps?: any;
}

export default function App (props: AppProps) {
	const { Component, pageProps } = props;

	return (
		<Environment.Provider>
			<Component {...pageProps} />
		</Environment.Provider>;
	);
}
```

### `useEnvironment`

Use this function for detecting the Environment.

```typescript
import { useEnvironment } from "@theholocron/bootstrap";

function Component() {
	const environment = useEnvironment();

	return (
		<h3>
			Environment: <code>{environment}</code>
		</h3>
	);
}
```
