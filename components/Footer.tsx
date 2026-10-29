import React from "react";
import Link from "next/link";

export interface FooterProps {
  className?: string;
  logoText?: string;
}

export const Footer: React.FC<FooterProps> = ({
  className = "",
  logoText = process.env.NEXT_PUBLIC_APP_NAME || "Journal X",
}) => {
  return (
    <footer className={`bg-white border-t border-zinc-100 pt-16 pb-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 pb-12 border-b border-zinc-100">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-1 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-zinc-950 uppercase"
            >
              <span>{logoText}</span>
            </Link>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-xs">
              Exploring terrains, conquering nature, and sharing stories from the
              wildest corners of the globe.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                <Link href="/" className="hover:text-zinc-950 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-zinc-950 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-zinc-950 transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-zinc-950 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              Categories
            </h4>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                <Link href="#categories" className="hover:text-zinc-950 transition-colors">
                  Travel
                </Link>
              </li>
              <li>
                <Link href="#categories" className="hover:text-zinc-950 transition-colors">
                  Adventure
                </Link>
              </li>
              <li>
                <Link href="#categories" className="hover:text-zinc-950 transition-colors">
                  Gear & Equipment
                </Link>
              </li>
              <li>
                <Link href="#categories" className="hover:text-zinc-950 transition-colors">
                  Outdoor Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              Follow Us
            </h4>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-zinc-950 transition-colors"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-zinc-950 transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-zinc-950 transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-zinc-950 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} {logoText}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-700 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-700 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-zinc-700 transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

