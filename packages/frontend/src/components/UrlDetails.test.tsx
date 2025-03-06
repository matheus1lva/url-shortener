import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UrlDetails from "./UrlDetails";
import { getUrlDetails } from "../services/api";
import { renderWithQueryClient } from "../test-utils";

// Mock the API modules
vi.mock("../services/api", () => ({
  getUrlDetails: vi.fn(),
  API_URL: "http://test-api.com/v1/",
}));

describe("UrlDetails", () => {
  const mockOnBack = vi.fn();
  const mockGetUrlDetails = getUrlDetails as unknown as ReturnType<
    typeof vi.fn
  >;
  const mockUrlDetails = {
    originalUrl: "https://example.com/long/url/path",
    shortUrl: "abc123",
    slug: "abc123",
    visits: 42,
    createdAt: "2023-03-01T12:00:00Z",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetUrlDetails.mockResolvedValue(mockUrlDetails);
  });

  it("renders the form correctly", () => {
    renderWithQueryClient(<UrlDetails onBack={mockOnBack} />);

    expect(screen.getByText("URL Shortener")).toBeInTheDocument();
    expect(screen.getByLabelText("Slug")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("handles slug input correctly", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<UrlDetails onBack={mockOnBack} />);

    const slugInput = screen.getByLabelText("Slug");
    await user.type(slugInput, "test-slug");

    expect(slugInput).toHaveValue("test-slug");
  });

  it("calls onBack when back button is clicked", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<UrlDetails onBack={mockOnBack} />);

    await user.click(screen.getByText("Back"));

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});
