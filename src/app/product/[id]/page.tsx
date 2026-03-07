import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { fetchProductById } from "@/lib/api";
import { formatCurrency, hasDiscount } from "@/lib/format";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await fetchProductById(id).catch(() => null);

  if (!product) {
    notFound();
  }

  const discounted = hasDiscount(product.price, product.discountedPrice);

  return (
    <article className="d-grid gap-4">
      <section className="rounded-4 border bg-white p-3 p-md-4 shadow-sm">
        <div className="row g-4 align-items-start">
          <div className="col-12 col-lg-6">
            <div
              className="position-relative w-100 overflow-hidden rounded-4"
              style={{ aspectRatio: "4 / 3" }}
            >
              <Image
                src={product.image.url}
                alt={product.image.alt || product.title}
                fill
                className="object-fit-cover"
                sizes="(max-width: 991px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="col-12 col-lg-6 d-grid gap-3">
            <h1 className="h3 mb-0">{product.title}</h1>
            <p className="mb-0 text-secondary">{product.description}</p>

            <div>
              {discounted ? (
                <span className="price-before">
                  {formatCurrency(product.price)}
                </span>
              ) : null}
              <span className="price-now fs-5">
                {formatCurrency(product.discountedPrice)}
              </span>
            </div>

            <p className="mb-0">Rating: {product.rating}/5</p>

            {product.tags.length ? (
              <div className="d-flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="badge rounded-pill text-bg-success-subtle border text-success"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}

            <div>
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-4 border bg-white p-3 p-md-4 shadow-sm">
        <h2 className="h5">Reviews</h2>
        {product.reviews.length ? (
          <ul className="list-group list-group-flush">
            {product.reviews.map((review) => (
              <li key={review.id} className="list-group-item px-0">
                <p className="mb-1 fw-semibold">{review.username}</p>
                <p className="mb-1 small text-secondary">
                  Rating: {review.rating}/5
                </p>
                <p className="mb-0">{review.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-0 text-secondary">
            No reviews for this product yet.
          </p>
        )}
      </section>
    </article>
  );
}
