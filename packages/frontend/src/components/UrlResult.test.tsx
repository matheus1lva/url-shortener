import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import UrlResult from "./UrlResult";
import { API_URL } from "../services/api";

// Mock the API_URL
vi.mock("../services/api", () => ({
  API_URL: "http://test-api.com/v1/",
}));

describe("UrlResult", () => {
  const mockShortUrl = "abc123";
  const mockOriginalUrl = "https://example.com/long/url/path";

  it("renders the URL details correctly", () => {
    render(<UrlResult shortUrl={mockShortUrl} originalUrl={mockOriginalUrl} />);

    // Check for success message
    expect(
      screen.getByText(/Success! Here's your short URL:/i)
    ).toBeInTheDocument();

    // Check original URL is displayed
    expect(screen.getByText(mockOriginalUrl)).toBeInTheDocument();

    // Check short URL is displayed with base URL
    const expectedShortUrl = API_URL + mockShortUrl;
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", expectedShortUrl);
    expect(linkElement).toHaveTextContent(expectedShortUrl);
  });
});
