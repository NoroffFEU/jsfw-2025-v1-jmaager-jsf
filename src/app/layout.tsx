import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { AppFooter } from "@/components/app-footer";
import { AppHeader } from "@/components/app-header";

export const metadata: Metadata = {
  title: "GreenCart | Online Shop",
  description: "A responsive online shop built with Next.js and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="d-flex min-vh-100 flex-column">
            <AppHeader />
            <main className="container-xxl flex-grow-1 px-3 py-4">
              {children}
            </main>
            <AppFooter />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
