import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { vi } from "vitest";

// Create a client for React Query
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        gcTime: 0,
        refetchOnWindowFocus: false,
      },
    },
  });

// Provider wrapper for React Query
export function renderWithQueryClient(ui: ReactNode, options?: RenderOptions) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>,
    options
  );

  return {
    ...result,
    rerender: (rerenderUi: ReactNode) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  };
}

// Mock for clipboard API
export function mockClipboard() {
  const mockClipboardObj = {
    writeText: vi.fn(() => Promise.resolve()),
  };

  vi.stubGlobal("navigator", {
    ...navigator,
    clipboard: mockClipboardObj,
  });

  return mockClipboardObj;
}
