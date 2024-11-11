# Configuration Component

A React Provider component for storing an applications configuration.

## Usage

```typescript
import { Configuration } from "@theholocron/bootstrap";
import * as React from "react";

interface AppProps {
    Component: React.ReactNode;
    pageProps?: any;
}

export default function App (props: AppProps) {
    const { Component, pageProps } = props;
    const conf = {
        description: "My app description";
        id: "app-name";
        name: "App name";
        slug: "app-name-ui";
        title: "App Name UI";
        version: 2023.1.0;
    };

    return (
        <Configuration.Provider conf={conf}>
            <Component {...pageProps} />
        </Configuration.Provider>
    );
}
```

### Hook

There is a hook that comes along with the library for retrieving the applications configuration.

```typescript
import { useConfiguration } from "@theholocron/bootstrap";

function Component () {
    const conf = useConfiguration();

    return (
        <div>
            <h3>Configuration</h3>
            <pre>{JSON.stringify(conf, null, 4)}</pre>
        </div>
    );
}
```

## Complete Configuration

```json
{
    application: {
        description: "This is a description for a mock application.",
        id: "mock-app-id",
        name: "A Mock Application",
        get slug (): string {
            return this.id;
        },
        title: "The title of the application, which maps to <title />",
        version: <appVersion || pkg.version>,
    },
    fetch: {
        conf: {
            ...otherAxiosConfig // https://github.com/axios/axios/blob/v1.x/index.d.ts#L314,
        },
        swr: {
            ...otherSWRConfig // https://swr.vercel.app/docs/api#options
        },
    },
}
```
