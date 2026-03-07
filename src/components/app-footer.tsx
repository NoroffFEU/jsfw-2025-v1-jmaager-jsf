export function AppFooter() {
  return (
    <footer className="footer-note mt-5 py-3">
      <div className="container-xxl px-3 text-center text-secondary">
        <small>
          GreenCart © {new Date().getFullYear()} — Built with Next.js +
          TypeScript
        </small>
      </div>
    </footer>
  );
}
