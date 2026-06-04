"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/shop";
import { useCart } from "@/context/cart-context";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!showModal) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [showModal]);

  function onAdd() {
    addToCart(product);
    setAdded(true);
    setShowModal(true);
    setTimeout(() => setAdded(false), 1200);
  }

  function onGoToCart() {
    setShowModal(false);
    router.push("/cart");
  }

  return (
    <>
      <button type="button" onClick={onAdd} className="btn btn-success">
        {added ? "Added ✓" : "Add to Cart"}
      </button>

      {showModal ? (
        <div
          className="add-cart-modal-backdrop"
          role="presentation"
          onClick={() => setShowModal(false)}
        >
          <div
            className="add-cart-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-cart-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="add-cart-modal-title" className="h5 mb-2">
              Added to cart
            </h2>
            <p className="text-muted mb-4">{product.title} is in your cart.</p>
            <div className="d-flex gap-2 justify-content-end flex-wrap">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowModal(false)}
              >
                Continue shopping
              </button>
              <button type="button" className="btn btn-success" onClick={onGoToCart}>
                Go to cart
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
