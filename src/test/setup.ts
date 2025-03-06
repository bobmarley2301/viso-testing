import "@testing-library/jest-dom";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// розширюємо очікування Vitest
expect.extend(matchers);

// очищаємо після кожного тесту
afterEach(() => {
  cleanup();
});
