import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import UrlForm from "./components/UrlForm";
import { useState } from "react";
import UrlDetails from "./components/UrlDetails";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  const [viewingDetails, setViewingDetails] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {viewingDetails ? (
            <UrlDetails onBack={() => setViewingDetails(false)} />
          ) : (
            <UrlForm
              toggleViewDetails={() =>
                setViewingDetails((prev) => {
                  return !prev;
                })
              }
            />
          )}
        </div>
        <footer className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} URL Shortener App - All rights reserved
          </p>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
