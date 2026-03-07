import { ProductExplorer } from "@/components/product-explorer";
import { fetchProducts } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await fetchProducts();

  return (
    <section>
      <div className="mb-4 rounded-4 border bg-white p-4 shadow-sm">
        <h1 className="h3 mb-2">Discover Products</h1>
        <p className="mb-0 text-secondary">
          Search, sort, and browse the full catalog. Click a product for
          details.
        </p>
      </div>

      <ProductExplorer products={products} />
    </section>
  );
}
