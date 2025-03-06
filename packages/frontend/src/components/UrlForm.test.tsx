import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UrlForm from "./UrlForm";
import { createShortUrl } from "../services/api";
import { renderWithQueryClient } from "../test-utils";

// Mock the API service
vi.mock("../services/api", () => ({
  createShortUrl: vi.fn(),
  API_URL: "http://test-api.com/v1",
}));

// Mock the UrlResult component
vi.mock("./UrlResult", () => ({
  default: ({
    shortUrl,
    originalUrl,
  }: {
    shortUrl: string;
    originalUrl: string;
  }) => (
    <div data-testid="url-result">
      <span data-testid="short-url">{shortUrl}</span>
      <span data-testid="original-url">{originalUrl}</span>
    </div>
  ),
}));

describe("UrlForm", () => {
  const mockToggleViewDetails = vi.fn();
  const mockCreateShortUrl = createShortUrl as unknown as ReturnType<
    typeof vi.fn
  >;

  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateShortUrl.mockResolvedValue({
      originalUrl: "https://example.com",
      shortUrl: "abc123",
      slug: "abc123",
    });
  });

  it("renders the form correctly", () => {
    renderWithQueryClient(
      <UrlForm toggleViewDetails={mockToggleViewDetails} />
    );

    expect(screen.getByText("URL Shortener")).toBeInTheDocument();
    expect(screen.getByLabelText("URL")).toBeInTheDocument();
    expect(screen.getByText("Customize slug")).toBeInTheDocument();
    expect(screen.getByText("Query URL Details")).toBeInTheDocument();
  });

  it("handles URL input correctly", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <UrlForm toggleViewDetails={mockToggleViewDetails} />
    );

    const urlInput = screen.getByLabelText("URL");
    await user.type(urlInput, "https://example.com");

    expect(urlInput).toHaveValue("https://example.com");
  });

  it("toggles custom slug field visibility", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <UrlForm toggleViewDetails={mockToggleViewDetails} />
    );

    // Custom slug field should not be visible initially
    expect(
      screen.queryByLabelText("Custom Slug (optional)")
    ).not.toBeInTheDocument();

    // Click to show custom slug field
    await user.click(screen.getByText("Customize slug"));

    // Custom slug field should now be visible
    expect(screen.getByLabelText("Custom Slug (optional)")).toBeInTheDocument();

    // Click again to hide
    await user.click(screen.getByText("Use random slug"));

    // Custom slug field should be hidden again
    expect(
      screen.queryByLabelText("Custom Slug (optional)")
    ).not.toBeInTheDocument();
  });

  it('calls toggleViewDetails when "Query URL Details" is clicked', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <UrlForm toggleViewDetails={mockToggleViewDetails} />
    );

    await user.click(screen.getByText("Query URL Details"));

    expect(mockToggleViewDetails).toHaveBeenCalledTimes(1);
  });

  it("shows error for invalid URL", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <UrlForm toggleViewDetails={mockToggleViewDetails} />
    );

    // Enter invalid URL
    await user.type(screen.getByLabelText("URL"), "not-a-valid-url");

    // Submit the form
    await user.click(screen.getByText("Shorten"));

    // Error message should be displayed
    expect(screen.getByText("Please enter a valid URL")).toBeInTheDocument();

    // API should not be called
    expect(mockCreateShortUrl).not.toHaveBeenCalled();
  });

  it("submits the form with valid URL and shows result", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <UrlForm toggleViewDetails={mockToggleViewDetails} />
    );

    // Enter valid URL
    await user.type(screen.getByLabelText("URL"), "https://example.com");

    // Submit the form
    await user.click(screen.getByText("Shorten"));

    // API should be called with correct parameters
    expect(mockCreateShortUrl).toHaveBeenCalledWith(
      "https://example.com",
      undefined
    );

    // Wait for the result to be shown
    await waitFor(() => {
      expect(screen.getByTestId("url-result")).toBeInTheDocument();
    });
  });

  it("submits the form with custom slug", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <UrlForm toggleViewDetails={mockToggleViewDetails} />
    );

    // Enter valid URL
    await user.type(screen.getByLabelText("URL"), "https://example.com");

    // Enable custom slug and enter a value
    await user.click(screen.getByText("Customize slug"));
    await user.type(
      screen.getByLabelText("Custom Slug (optional)"),
      "my-custom-slug"
    );

    // Submit the form
    await user.click(screen.getByText("Shorten"));

    // API should be called with URL and custom slug
    expect(mockCreateShortUrl).toHaveBeenCalledWith(
      "https://example.com",
      "my-custom-slug"
    );
  });

  it("handles API error correctly", async () => {
    const errorMessage = "Custom slug already in use";
    mockCreateShortUrl.mockRejectedValue(new Error(errorMessage));

    const user = userEvent.setup();
    renderWithQueryClient(
      <UrlForm toggleViewDetails={mockToggleViewDetails} />
    );

    // Enter valid URL
    await user.type(screen.getByLabelText("URL"), "https://example.com");

    // Submit the form
    await user.click(screen.getByText("Shorten"));

    // Error message should be displayed
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
