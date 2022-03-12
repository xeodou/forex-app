import { ForexApiClient } from "./forex-api/client";

const forexApiBaseUrl = process.env.NEXT_PUBLIC_FOREX_API_BASE_URL as string;
const forexApiToken = process.env.NEXT_PUBLIC_FOREX_API_TOKEN as string;


export const forexApiClient = ForexApiClient.createClient(forexApiBaseUrl, forexApiToken);
