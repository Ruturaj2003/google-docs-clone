"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center text-gray-800">
      <h1 className="mb-2 text-3xl font-bold">Something went wrong</h1>
      <p className="mb-4 text-gray-600">
        An unexpected error occurred. Please try again.
      </p>

      <button
        onClick={reset}
        className="rounded-md bg-black px-4 py-2 text-white transition hover:bg-gray-900"
      >
        Retry
      </button>

      {process.env.NODE_ENV === "development" && error?.message && (
        <div className="mt-6 max-w-xl whitespace-pre-wrap text-left text-sm text-red-500">
          <strong>Error Details:</strong>
          <pre>{error.message}</pre>
        </div>
      )}
    </div>
  );
}
