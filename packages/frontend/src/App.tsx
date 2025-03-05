import { useState } from "react";
import UrlForm from "./components/UrlForm";
import UrlResult from "./components/UrlResult";
import "./App.css";

function App() {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);

  const handleUrlShortened = (shortUrl: string, originalUrl: string) => {
    setShortUrl(shortUrl);
    setOriginalUrl(originalUrl);
  };

  const handleReset = () => {
    setShortUrl(null);
    setOriginalUrl(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {shortUrl && originalUrl ? (
          <>
            <UrlResult shortUrl={shortUrl} originalUrl={originalUrl} />
            <div className="mt-4 text-center">
              <button
                onClick={handleReset}
                className="text-blue-600 hover:underline"
              >
                Shorten another URL
              </button>
            </div>
          </>
        ) : (
          <UrlForm onSuccess={handleUrlShortened} />
        )}
      </div>
      <footer className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} URL Shortener App - All rights reserved
        </p>
      </footer>
    </div>
  );
}

export default App;
