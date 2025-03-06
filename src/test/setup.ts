import "@testing-library/jest-dom";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Створюємо кеш для emotion
const cache = createCache({
  key: "css",
  prepend: true,
});

// Створюємо обгортку для тестів
const createEmotionCache = () => cache;

// Розширюємо очікування Vitest
expect.extend(matchers);

// Очищаємо після кожного тесту
afterEach(() => {
  cleanup();
});

// Експортуємо кеш для використання в тестах
export { createEmotionCache };
