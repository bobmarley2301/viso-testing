import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>{component}</ChakraProvider>
    </QueryClientProvider>
  );
};

describe("App", () => {
  it("рендериться без помилок", () => {
    const { container } = renderWithProviders(<App />);
    expect(container).toBeInTheDocument();
  });
});
