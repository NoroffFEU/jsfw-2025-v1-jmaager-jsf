"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="rounded-4 border bg-white p-4 shadow-sm text-center">
      <h1 className="h5 mb-2">Something went wrong</h1>
      <p className="text-secondary mb-3">
        We could not load the data right now. Please try again.
      </p>
      <button type="button" className="btn btn-success" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
