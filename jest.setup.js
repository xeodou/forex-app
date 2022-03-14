// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { enableFetchMocks } from "jest-fetch-mock";
import { TextDecoder } from "util";

enableFetchMocks();

global.TextDecoder = TextDecoder;

// Set envs
process.env.NEXT_PUBLIC_FOREX_API_BASE_URL = "http://localhost:8080";
