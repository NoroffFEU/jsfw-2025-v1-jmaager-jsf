"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/format";
import { useToast } from "@/components/toast-provider";

export default function CartPage() {
  const { items, totalCost, removeFromCart, setQuantity } = useCart();
  const { addToast } = useToast();

  if (!items.length) {
    return (
      <section className="rounded-4 border bg-white p-4 shadow-sm text-center">
        <h1 className="h4">Your cart is empty</h1>
        <p className="text-secondary">
          Add some products from the homepage to get started.
        </p>
        <Link href="/" className="btn btn-success">
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="d-grid gap-3">
      <h1 className="h3">Shopping Cart</h1>

      <div className="d-grid gap-3">
        {items.map((item) => (
          <article
            key={item.product.id}
            className="rounded-4 border bg-white p-3 shadow-sm"
          >
            <div className="row g-3 align-items-center">
              <div className="col-12 col-sm-3 col-md-2">
                <div
                  className="position-relative w-100 overflow-hidden rounded-3"
                  style={{ aspectRatio: "1 / 1" }}
                >
                  <Image
                    src={item.product.image.url}
                    alt={item.product.image.alt || item.product.title}
                    fill
                    className="object-fit-cover"
                    sizes="(max-width: 576px) 100vw, 160px"
                  />
                </div>
              </div>

              <div className="col-12 col-sm-9 col-md-4">
                <h2 className="h6 mb-1">{item.product.title}</h2>
                <p className="mb-0 text-secondary">
                  {formatCurrency(item.product.discountedPrice)} each
                </p>
              </div>

              <div className="col-6 col-md-2">
                <label className="form-label mb-1 small">Quantity</label>
                <input
                  type="number"
                  min={1}
                  className="form-control"
                  value={item.quantity}
                  onChange={(event) =>
                    setQuantity(
                      item.product.id,
                      Math.max(1, Number(event.target.value) || 1),
                    )
                  }
                />
              </div>

              <div className="col-6 col-md-2">
                <p className="mb-1 small text-secondary">Subtotal</p>
                <p className="mb-0 fw-semibold">
                  {formatCurrency(item.quantity * item.product.discountedPrice)}
                </p>
              </div>

              <div className="col-12 col-md-2 d-grid">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => {
                    removeFromCart(item.product.id);
                    addToast(
                      `${item.product.title} removed from cart`,
                      "danger",
                    );
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-4 border bg-white p-4 shadow-sm">
        <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
          <p className="mb-0 fs-5">
            Total: <strong>{formatCurrency(totalCost)}</strong>
          </p>

          <Link href="/checkout/success" className="btn btn-success btn-lg">
            Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}
