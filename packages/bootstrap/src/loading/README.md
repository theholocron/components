# Loading Component

A React Provider component for handling the loading of an application.

## Usage

```typescript
import { Loading } from "@theholocron/bootstrap";
import * as React from "react";

interface AppProps {
	Component: React.ReactNode;
	pageProps?: any;
}

export default function App(props: AppProps) {
	const { Component, pageProps } = props;

	return (
		<Loading.Provider>
			<Component {...pageProps} />
		</Loading.Provider>
	);
}
```

### `useLoading`

Use this function for getting the loading state and setting it.

```typescript
import { useLoading } from "@theholocron/bootstrap";

function Component() {
	const { isLoading, setLoading } = useLoading();

	const handleClick = () => {
		setLoading?.(true);
	};

	if (isLoading) {
		return <div>Loading…</div>;
	}

	return (
		<button onClick={handleClick} type="button">
			Set Loading
		</button>
	);
}
```
