# Konami Component

A React Provider component for providing an application use of the Konami code (↑ ↑ ↓ ↓ ← → ← → B A).

![konami](./konami.jpg)

## Usage

```typescript
import Konami from "@theholocron/bootstrap";
import * as React from "react";

interface AppProps {
	Component: React.ReactNode;
	pageProps?: any;
}

export default function App(props: AppProps) {
	const { Component, pageProps } = props;

	return (
		<Konami.Provider>
			<Component {...pageProps} />
		</Konami.Provider>
	);
}
```

### `useKonami`

Use this function for detecting the Konami code.

```typescript
import { useKonami } from "@theholocron/bootstrap";

function Component() {
	const konamiCodeEntered = useKonami();

	return (
		<React.Fragment>
			{konamiCodeEntered ? (
				<p>Konami Code Entered!</p>
			) : (
				<p>Enter the Konami Code (↑ ↑ ↓ ↓ ← → ← → B A)</p>
			)}
		</React.Fragment>
	);
}
```
