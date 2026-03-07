"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Product } from "@/types/shop";
import { ProductCard } from "@/components/product-card";
import { getDiscountPercent } from "@/lib/format";

type SortKey = "default" | "price-low" | "price-high" | "rating" | "discount";

interface ProductExplorerProps {
  products: Product[];
}

export function ProductExplorer({ products }: ProductExplorerProps) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("default");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    const bySearch = normalized
      ? products.filter((product) =>
          `${product.title} ${product.description} ${product.tags.join(" ")}`
            .toLowerCase()
            .includes(normalized),
        )
      : products;

    return [...bySearch].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.discountedPrice - b.discountedPrice;
        case "price-high":
          return b.discountedPrice - a.discountedPrice;
        case "rating":
          return b.rating - a.rating;
        case "discount":
          return (
            getDiscountPercent(b.price, b.discountedPrice) -
            getDiscountPercent(a.price, a.discountedPrice)
          );
        default:
          return a.title.localeCompare(b.title);
      }
    });
  }, [products, query, sortBy]);

  const suggestions = useMemo(() => filtered.slice(0, 8), [filtered]);

  return (
    <div className="d-grid gap-4">
      <div className="rounded-4 border bg-white p-3 shadow-sm">
        <div className="row g-3">
          <div className="col-12 col-md-8 position-relative">
            <label htmlFor="search" className="form-label fw-medium">
              Search products
            </label>
            <input
              id="search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="form-control"
              placeholder="Try: headphones, perfume, beauty..."
            />

            {query.trim() ? (
              <div className="search-dropdown list-group mt-2">
                {suggestions.length ? (
                  suggestions.map((product) => (
                    <Link
                      className="list-group-item list-group-item-action"
                      key={product.id}
                      href={`/product/${product.id}`}
                    >
                      {product.title}
                    </Link>
                  ))
                ) : (
                  <div className="list-group-item text-secondary">
                    No matches found
                  </div>
                )}
              </div>
            ) : null}
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="sort" className="form-label fw-medium">
              Sort by
            </label>
            <select
              id="sort"
              className="form-select"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortKey)}
            >
              <option value="default">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="rating">Rating (High to Low)</option>
              <option value="discount">Best Discount</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row g-3 g-lg-4">
        {filtered.map((product) => (
          <div className="col-12 col-sm-6 col-xl-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {!filtered.length ? (
        <p className="text-secondary">No products match your search.</p>
      ) : null}
    </div>
  );
}
