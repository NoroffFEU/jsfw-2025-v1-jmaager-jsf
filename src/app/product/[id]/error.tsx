"use client";

import Link from "next/link";
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
      <h1 className="h5 mb-2">Unable to load product</h1>
      <p className="text-secondary mb-3">
        Please try again or return to the product list.
      </p>
      <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
        <button type="button" className="btn btn-success" onClick={reset}>
          Try again
        </button>
        <Link href="/" className="btn btn-outline-success">
          Back to products
        </Link>
      </div>
    </section>
  );
}
