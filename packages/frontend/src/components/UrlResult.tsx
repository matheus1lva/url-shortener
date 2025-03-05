import { useState } from "react";

interface UrlResultProps {
  shortUrl: string;
  originalUrl: string;
}

export default function UrlResult({ shortUrl, originalUrl }: UrlResultProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <p className="mb-6 text-gray-600 italic">
        Success! Here's your short URL:
      </p>

      <div className="mb-4">
        <p className="mb-1 text-sm text-gray-600">Original URL:</p>
        <p className="p-2 mb-4 overflow-x-auto text-sm bg-gray-100 rounded">
          {originalUrl}
        </p>

        <p className="mb-1 text-sm text-gray-600">Short URL:</p>
        <div className="flex mb-4">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2 mr-2 overflow-hidden text-blue-600 bg-gray-100 rounded grow hover:underline"
          >
            {shortUrl}
          </a>
          <button
            onClick={copyToClipboard}
            className="px-3 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            title="Copy to clipboard"
          >
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 2a1 1 0 00-.697 1.717L10.586 6H6a1 1 0 100 2h4.586l-2.293 2.293a1 1 0 101.414 1.414l4-4a1 1 0 000-1.414l-4-4A1 1 0 009 2z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {copied && (
        <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}
