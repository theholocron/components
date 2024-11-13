# Browser Storage

A React Provider component for storing data within browser storage utilizing `window.sessionStorage`.

## Usage

```typescript
import { Storage } from "@theholocron/bootstrap";
import * as React from "react";

const conf: ApplicationConf = {
    application: { id: "mock-app-id" },
};

interface AppProps {
    Component: React.ReactNode;
    pageProps?: any;
}

export default function App (props: AppProps) {
    const { Component, pageProps } = props;

    return (
        <Storage.Provider conf={conf.application}>
            <Component {...pageProps} />
        </Storage.Provider>;
    );
}
```

### `useStorage`

Use this function for getting, setting and removing items from the storage, i.e. `sessionStorage`.

```typescript
import { useStorage } from "@theholocron/bootstrap";

const storage = useStorage();

// send an item to the store
storage.sendTo("mockKey", item);

// grab an item from the store
const item = storage.getFrom("mockKey");

// delete it if you want
storage.removeFrom("mockKey");
```
