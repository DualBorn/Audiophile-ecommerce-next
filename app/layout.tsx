import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Audiophile | Premium Audio Equipment",
  description: "Premium audio equipment for music enthusiasts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} font-sans antialiased`}
      >
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
