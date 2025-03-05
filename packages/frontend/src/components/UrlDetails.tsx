import { useQuery } from "@tanstack/react-query";
import { API_URL, getUrlDetails } from "../services/api";
import { FormEvent, useState } from "react";

const Header = () => (
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
);

const DetailsCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex flex-col p-3 border border-gray-200 rounded-md bg-white shadow-sm">
    <span className="text-sm text-gray-500 mb-1">{label}</span>
    <p className="text-gray-700 font-medium">{value}</p>
  </div>
);

interface UrlDetailsProps {
  onBack: () => void;
}

export default function UrlDetails({ onBack }: UrlDetailsProps) {
  const [slug, setSlug] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const {
    data: details,
    error,
    refetch,
  } = useQuery({
    queryKey: ["urlDetails", slug],
    queryFn: () => getUrlDetails(slug),
    enabled: shouldFetch && !!slug,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (slug) {
      setShouldFetch(true);
      refetch();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <Header />
      <p className="mb-6 text-gray-600">Enter the slug to query details</p>

      {error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {String(error)}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="slug"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Slug
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter a slug to query details"
            required
          />
        </div>
        <div className="flex justify-between mb-2">
          <button
            type="submit"
            className="text-sm text-blue-600 hover:underline bg-gray-200 rounded-lg p-2"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-blue-600 hover:underline bg-gray-200 rounded-lg p-2"
          >
            Back
          </button>
        </div>
      </form>

      {details && (
        <div className="mt-6 p-5 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            URL Details
          </h3>

          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Short URL</span>
              <div className="flex items-center mt-1 group">
                <a
                  href={details.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium truncate mr-2"
                >
                  {API_URL + details.shortUrl}
                </a>
                <button
                  className="p-1 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copyToClipboard(details.shortUrl)}
                  title="Copy to clipboard"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Original URL</span>
              <p className="text-gray-700 break-all">{details.originalUrl}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DetailsCard label="Slug" value={details.slug} />
              <DetailsCard
                label="Created At"
                value={new Date(details.createdAt).toLocaleString()}
              />
              <DetailsCard label="Visits" value={details.visits} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
