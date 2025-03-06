import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { renderWithQueryClient } from "./test-utils";

// Mock the components used in App to isolate the test
vi.mock("./components/UrlForm", () => ({
  default: ({ toggleViewDetails }: { toggleViewDetails: () => void }) => (
    <div data-testid="url-form">
      <button onClick={toggleViewDetails} data-testid="view-details-button">
        View Details
      </button>
    </div>
  ),
}));

vi.mock("./components/UrlDetails", () => ({
  default: ({ onBack }: { onBack: () => void }) => (
    <div data-testid="url-details">
      <button onClick={onBack} data-testid="back-button">
        Back
      </button>
    </div>
  ),
}));

describe("App", () => {
  it("renders UrlForm by default", () => {
    renderWithQueryClient(<App />);
    expect(screen.getByTestId("url-form")).toBeInTheDocument();
    expect(screen.queryByTestId("url-details")).not.toBeInTheDocument();
  });

  it("toggles between UrlForm and UrlDetails", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<App />);

    // Initially shows UrlForm
    expect(screen.getByTestId("url-form")).toBeInTheDocument();

    // Click to show UrlDetails
    await user.click(screen.getByTestId("view-details-button"));
    expect(screen.getByTestId("url-details")).toBeInTheDocument();
    expect(screen.queryByTestId("url-form")).not.toBeInTheDocument();

    // Click to go back to UrlForm
    await user.click(screen.getByTestId("back-button"));
    expect(screen.getByTestId("url-form")).toBeInTheDocument();
    expect(screen.queryByTestId("url-details")).not.toBeInTheDocument();
  });

  it("has the correct layout structure", () => {
    renderWithQueryClient(<App />);

    // Check for footer content
    expect(screen.getByText(/URL Shortener App/)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(String(new Date().getFullYear())))
    ).toBeInTheDocument();
  });
});
