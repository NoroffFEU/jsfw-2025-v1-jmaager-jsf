"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/cart-context";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
  { href: "/cart", label: "Cart" },
];

export function AppHeader() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <header className="app-header">
      <div className="container-xxl px-3 py-3">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <Link
            href="/"
            className="d-flex align-items-center gap-2 fw-semibold fs-5"
          >
            <span className="brand-pill">SHOP</span>
            <span>GreenCart</span>
          </Link>

          <nav className="d-flex flex-wrap gap-2">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`btn btn-sm ${isActive ? "btn-success" : "btn-outline-success"}`}
                >
                  {item.label}
                  {item.href === "/cart" ? ` (${itemCount})` : ""}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
