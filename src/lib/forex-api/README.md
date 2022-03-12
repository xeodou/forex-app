## Forex API

### How to use it

You can use it by import the library directly and create a singletone instance of the ForexAPIClient, for example:

```typescript
import { ForexApiClient } from "forex-api/client";

const forexApiClient = ForexApiClient.createClient(
  "http://localhost:8080",
  "your_forex_api_token"
);
```
