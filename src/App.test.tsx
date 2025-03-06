import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CacheProvider } from "@emotion/react";
import { createEmotionCache } from "./test/setup";
import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const emotionCache = createEmotionCache();

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>{component}</ChakraProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
};

describe("App", () => {
  it("рендериться без помилок", () => {
    const { container } = renderWithProviders(<App />);
    expect(container).toBeInTheDocument();
  });
});
