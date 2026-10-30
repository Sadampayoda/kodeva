"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import useCart from "@/hooks/useCart";

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export interface NavbarProps {
  className?: string;
  logoText?: string;
  theme?: "dark" | "light";
}

const defaultNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Produk", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
  { label: "Konsultasi", href: "/#lead-capture" },
];

export const Navbar: React.FC<NavbarProps> = ({
  className = "",
  logoText = process.env.NEXT_PUBLIC_APP_NAME || "KODEVA",
  theme = "dark",
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  const { totals, isInitialized } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const handleCloseMobileMenu = () => setMobileMenuOpen(false);
  const handleToggleDropdown = () => setPagesDropdownOpen((prev) => !prev);
  const handleOpenDropdown = () => setPagesDropdownOpen(true);
  const handleCloseDropdown = () => setPagesDropdownOpen(false);

  const isLight = theme === "light";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? isLight
              ? "bg-white/80 backdrop-blur-md border-b border-zinc-200/80 py-3.5 shadow-sm"
              : "bg-black/70 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg"
            : "bg-transparent py-5"
        } ${className}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <Link
            href="/"
            className={`flex items-center gap-2.5 font-black text-lg md:text-xl tracking-tight group ${
              isLight ? "text-zinc-950" : "text-white"
            }`}
          >
            <span className="uppercase">{logoText}</span>
          </Link>

          <nav
            className={`hidden md:flex items-center gap-8 text-sm font-medium ${
              isLight ? "text-zinc-600" : "text-white/80"
            }`}
          >
            {defaultNavItems.map((item) => {
              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={handleOpenDropdown}
                    onMouseLeave={handleCloseDropdown}
                  >
                    <button
                      type="button"
                      onClick={handleToggleDropdown}
                      className={`flex items-center gap-1.5 transition-colors py-2 focus:outline-none ${
                        isLight ? "hover:text-zinc-950" : "hover:text-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          pagesDropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {pagesDropdownOpen && (
                      <div
                        className={`absolute top-full left-0 mt-1 w-44 rounded-xl backdrop-blur-md border p-2 shadow-xl animate-in fade-in slide-in-from-top-1 ${
                          isLight
                            ? "bg-white/95 border-zinc-200"
                            : "bg-zinc-900/95 border-white/10"
                        }`}
                      >
                        {item.children.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                              isLight
                                ? "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100"
                                : "text-zinc-300 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`transition-colors ${
                    isLight ? "hover:text-zinc-950" : "hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              aria-label="Keranjang Belanja"
              className={`relative p-2.5 rounded-full transition-all active:scale-95 ${
                isLight
                  ? "text-zinc-800 hover:text-zinc-950 hover:bg-zinc-100"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {isInitialized && totals.totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-black flex items-center justify-center shadow-md animate-in zoom-in">
                  {totals.totalQuantity > 99 ? "99+" : totals.totalQuantity}
                </span>
              )}
            </Link>

            <Link
              href="/#lead-capture"
              className={`rounded-full font-semibold text-xs md:text-sm px-5 md:px-6 py-2 md:py-2.5 transition-all shadow-sm active:scale-95 ${
                isLight
                  ? "bg-zinc-950 text-white hover:bg-zinc-800"
                  : "bg-white text-zinc-950 hover:bg-zinc-200"
              }`}
            >
              Konsultasi
            </Link>

            <button
              type="button"
              onClick={handleToggleMobileMenu}
              aria-label="Toggle navigation menu"
              className={`md:hidden p-2 focus:outline-none ${
                isLight
                  ? "text-zinc-800 hover:text-zinc-950"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className={`md:hidden backdrop-blur-xl border-b px-6 py-6 space-y-4 ${
              isLight
                ? "bg-white/95 border-zinc-200 text-zinc-800"
                : "bg-zinc-950/95 border-white/10 text-white/80"
            }`}
          >
            <div className="flex flex-col space-y-3 text-base font-medium">
              {defaultNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={handleCloseMobileMenu}
                  className={`transition-colors ${
                    isLight
                      ? "text-zinc-700 hover:text-zinc-950"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/cart"
                onClick={handleCloseMobileMenu}
                className={`pt-2 border-t flex items-center justify-between ${
                  isLight
                    ? "border-zinc-200 text-blue-600 font-bold"
                    : "border-white/10 text-blue-400 font-bold"
                }`}
              >
                <span>Keranjang Belanja</span>
                {isInitialized && totals.totalQuantity > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs font-bold">
                    {totals.totalQuantity}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </header>

      {isInitialized && totals.totalQuantity > 0 && (
        <Link
          href="/cart"
          aria-label="Lihat Keranjang Belanja"
          className="fixed bottom-6 right-6 z-40 md:hidden flex items-center gap-2.5 px-4 py-3 rounded-full bg-blue-600 text-white font-bold text-xs shadow-xl shadow-blue-600/30 active:scale-95 transition-transform"
        >
          <div className="relative">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-white text-blue-600 text-[10px] font-black flex items-center justify-center">
              {totals.totalQuantity}
            </span>
          </div>
          <span>Keranjang</span>
        </Link>
      )}
    </>
  );
};

export default Navbar;
