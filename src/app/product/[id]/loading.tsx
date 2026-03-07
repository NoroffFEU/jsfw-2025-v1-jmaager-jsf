export default function Loading() {
  return (
    <section className="rounded-4 border bg-white p-4 shadow-sm">
      <div className="d-flex align-items-center gap-3">
        <div className="spinner-border text-success" role="status" />
        <p className="mb-0 text-secondary">Loading product details...</p>
      </div>
    </section>
  );
}
