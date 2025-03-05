export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/v1";

interface CreateUrlResponse {
  originalUrl: string;
  shortUrl: string;
  slug: string;
}

interface UrlDetailsResponse extends CreateUrlResponse {
  visits: number;
  createdAt: string;
}

export const createShortUrl = async (
  originalUrl: string,
  customSlug?: string
): Promise<CreateUrlResponse> => {
  const response = await fetch(`${API_URL}/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ originalUrl, customSlug }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create short URL");
  }

  return response.json();
};

export const getUrlDetails = async (
  slug: string
): Promise<UrlDetailsResponse> => {
  const response = await fetch(`${API_URL}/shorten/${slug}/details`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get URL details");
  }

  return response.json();
};
