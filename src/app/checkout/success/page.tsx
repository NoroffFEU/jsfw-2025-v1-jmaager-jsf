"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/context/cart-context";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <section className="rounded-4 border bg-white p-4 p-md-5 shadow-sm text-center">
      <h1 className="h3 mb-3">Thank you for your order!</h1>
      <p className="text-secondary mb-4">
        Your checkout was successful. A confirmation has been placed for your
        purchase.
      </p>
      <Link href="/" className="btn btn-success">
        Back to homepage
      </Link>
    </section>
  );
}
