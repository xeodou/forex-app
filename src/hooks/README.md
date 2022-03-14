## Hooks

The shared hooks for the projects. Please read more if you want to know how does hooks work in React at [here](https://reactjs.org/docs/hooks-intro.html).

### use-currency-pair

This hook that will mantain a [CurrencyPairContext](./use-currency-pair/index.tsx?l=23) and shared the selected currency pair with the other component needs to access the currency pair.

Usage:

```typescript
import { useCurrencyPair } from "hooks";

const [currencyPair, setCurrencyPair] = useCurrencyPair();
```

### use-forex-rates

The hook wrap the forex getRates API into a hook, so you can read the realtime currency rates by React hook.

Usage:

```typescript
import { useForexRates } from "hooks";

const {
  // The realtime forex rates list
  forexRates,
  // The error response
  forexError,
  // A function to reset the data
  reset,
} = useForexRates();
```

### use-notify

This is a global hooks that will matain the notify message context.

Usage:

```typescript
import { useNotify } from "hooks";

const { stack, removeNotifyItem } = useNotify();
```
