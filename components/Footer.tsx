import React from "react";
import Link from "next/link";

export interface FooterProps {
  className?: string;
  logoText?: string;
}

export const Footer: React.FC<FooterProps> = ({
  className = "",
  logoText = process.env.NEXT_PUBLIC_APP_NAME || "Kodeva",
}) => {
  return (
    <footer className={`bg-white border-t border-zinc-100 pt-16 pb-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 pb-12 border-b border-zinc-100">
          <div className="md:col-span-1 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-zinc-950 uppercase"
            >
              <span>{logoText}</span>
            </Link>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-xs">
              Membangun solusi digital, aplikasi kasir, sistem SaaS modern, dan template premium untuk bisnis Anda.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              Navigasi
            </h4>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                <Link href="/" className="hover:text-zinc-950 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-zinc-950 transition-colors">
                  Blog & Artikel
                </Link>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-zinc-950 transition-colors">
                  Produk Unggulan
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-zinc-950 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              Produk & Layanan
            </h4>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                <a href="#featured-products" className="hover:text-zinc-950 transition-colors">
                  Kodeva POS
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-zinc-950 transition-colors">
                  Kodeva SaaS Kit
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-zinc-950 transition-colors">
                  Kodeva HR & Payroll
                </a>
              </li>
              <li>
                <Link href="/studio" className="hover:text-zinc-950 transition-colors">
                  Sanity Studio (CMS)
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              Bantuan & Kontak
            </h4>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                <a href="#lead-capture" className="hover:text-zinc-950 transition-colors">
                  Konsultasi Gratis
                </a>
              </li>
              <li>
                <a href="#lead-capture" className="hover:text-zinc-950 transition-colors">
                  Hubungi Sales
                </a>
              </li>
              <li>
                <span className="text-zinc-400 text-xs">Senin - Jumat, 09:00 - 18:00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} {logoText}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
