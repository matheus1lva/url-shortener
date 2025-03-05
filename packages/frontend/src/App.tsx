import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, ReactNode } from "react";
import UrlForm from "./components/UrlForm";
import UrlDetails from "./components/UrlDetails";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md mx-auto">{children}</div>
    <footer className="mt-8 text-center">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} URL Shortener App - All rights reserved
      </p>
    </footer>
  </div>
);

function App() {
  const [viewingDetails, setViewingDetails] = useState(false);

  const showUrlForm = () => setViewingDetails(false);
  const showUrlDetails = () => setViewingDetails(true);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        {viewingDetails ? (
          <UrlDetails onBack={showUrlForm} />
        ) : (
          <UrlForm toggleViewDetails={showUrlDetails} />
        )}
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
