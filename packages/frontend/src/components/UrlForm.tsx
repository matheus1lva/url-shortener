import { useState, FormEvent, ChangeEvent } from "react";
import { createShortUrl } from "../services/api";

interface UrlFormProps {
  onSuccess: (shortUrl: string, originalUrl: string, slug: string) => void;
}

export default function UrlForm({ onSuccess }: UrlFormProps) {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCustomSlug, setShowCustomSlug] = useState(false);

  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!url) {
      setError("Please enter a URL");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    try {
      const result = await createShortUrl(url, customSlug || undefined);
      onSuccess(result.shortUrl, result.originalUrl, result.slug);
      setUrl("");
      setCustomSlug("");
      setShowCustomSlug(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">URL Shortener</h2>
        <svg
          className="w-6 h-6 ml-2 text-blue-500"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 7L11.168 4.252C10.283 2.907 8.155 2.977 7.364 4.377L1.5 15L3.5 16.5L9.5 16.5M16.5 7L12.5 7M21 15.5L15 7L9 15.5C8.333 16.5 9.1 18 10.5 18L19.5 18C20.9 18 21.667 16.5 21 15.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className="mb-6 text-gray-600">Enter the URL to shorten</p>

      {error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="url"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            URL
          </label>
          <input
            type="text"
            id="url"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/foo/bar/biz"
            value={url}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUrl(e.target.value)
            }
            required
          />
        </div>

        <div className="mb-2">
          <button
            type="button"
            onClick={() => setShowCustomSlug(!showCustomSlug)}
            className="text-sm text-blue-600 hover:underline"
          >
            {showCustomSlug ? "Use random slug" : "Customize slug"}
          </button>
        </div>

        {showCustomSlug && (
          <div className="mb-4">
            <label
              htmlFor="customSlug"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Custom Slug (optional)
            </label>
            <input
              type="text"
              id="customSlug"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="my-custom-slug"
              value={customSlug}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCustomSlug(e.target.value)
              }
              pattern="^[a-zA-Z0-9_-]*$"
              title="Only letters, numbers, underscores and hyphens are allowed"
            />
            <p className="mt-1 text-xs text-gray-500">
              Only letters, numbers, underscores and hyphens
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 
            ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Processing..." : "Shorten"}
        </button>
      </form>
    </div>
  );
}
