import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/shop";
import { formatCurrency, getDiscountPercent, hasDiscount } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const discounted = hasDiscount(product.price, product.discountedPrice);
  const discountPercent = getDiscountPercent(
    product.price,
    product.discountedPrice,
  );

  return (
    <article className="card shop-card bg-white shadow-sm">
      <Link href={`/product/${product.id}`} className="text-reset">
        <div className="product-image-wrap rounded-top-4">
          {discounted ? (
            <span className="discount-badge badge rounded-pill bg-danger">
              -{discountPercent}%
            </span>
          ) : null}

          <Image
            src={product.image.url}
            alt={product.image.alt || product.title}
            fill
            sizes="(max-width: 576px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-fit-cover"
          />
        </div>

        <div className="card-body d-flex h-100 flex-column">
          <h2 className="h6 card-title mb-2">{product.title}</h2>
          <p className="small mb-3 text-secondary">
            Rating: {product.rating}/5
          </p>

          <div className="mt-auto">
            {discounted ? (
              <span className="price-before">
                {formatCurrency(product.price)}
              </span>
            ) : null}
            <span className="price-now">
              {formatCurrency(product.discountedPrice)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
