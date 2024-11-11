# Location Component

A React Provider component for storing the users current location.

## Usage

```typescript
import { Location } from "@theholocron/bootstrap";
import * as React from "react";

interface AppProps {
    Component: React.ReactNode;
    pageProps?: any;
}

export default function App (props: AppProps) {
    const { Component, pageProps } = props;

    return (
        <Location.Provider>
            <Component {...pageProps} />
        </Location.Provider>;
    );
}
```

### Hook

There is a hook that comes along with the library for detecting the current location.

```typescript
import { useLocation } from "@theholocron/bootstrap";

function Component () {
    const location = useLocation();

    return <h3>Current location: <code>{location.latitude}</code> (latitude), <code>{location.longitude}</code> (longitude)</h3>;
}
```
