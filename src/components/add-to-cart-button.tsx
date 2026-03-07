"use client";

import { useState } from "react";
import { Product } from "@/types/shop";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/components/toast-provider";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [added, setAdded] = useState(false);

  function onAdd() {
    addToCart(product);
    addToast(`${product.title} added to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button type="button" onClick={onAdd} className="btn btn-success">
      {added ? "Added ✓" : "Add to Cart"}
    </button>
  );
}
