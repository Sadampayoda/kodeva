"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import type { UseProductCatalogReturn } from "@/hooks/useProductCatalog";

export type ProductCatalogPageProps = Partial<UseProductCatalogReturn>;

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProductCatalogPage(props: ProductCatalogPageProps) {
  const {
    products = [],
    allCategories = [],
    selectedCategory = "Semua",
    searchQuery = "",
    sortBy = "featured",
    isLoading = false,
    isError = false,
    loadingMessage = "",
    handleSelectCategory = () => {},
    handleSearchChange = () => {},
    handleSortChange = () => {},
    handleRefetch = () => {},
  } = props;

  return (
    <main className="min-h-screen bg-[#f8f8fa] text-zinc-900 selection:bg-blue-600 selection:text-white">
      <Navbar theme="light" />

      <Section
        id="catalog-header"
        className="pt-28 md:pt-36 pb-10 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col justify-start"
      >
        <div className="space-y-4 max-w-3xl">
          <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Marketplace Kodeva
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#222144] leading-tight">
            Katalog Produk & Source Code
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Pilih aplikasi dan starter kit berkualitas tinggi. Siap diinstal dan disesuaikan untuk kebutuhan bisnis atau proyek klien Anda.
          </p>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Cari produk aplikasi..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-zinc-500 whitespace-nowrap">
              Urutkan:
            </label>
            <select
              value={sortBy}
              onChange={(e) =>
                handleSortChange(
                  e.target.value as "featured" | "price-asc" | "price-desc"
                )
              }
              className="px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-sm"
            >
              <option value="featured">Unggulan</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="price-desc">Harga Tertinggi</option>
            </select>
          </div>
        </div>

        <div className="pt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {allCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleSelectCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#222144] text-white shadow-md shadow-indigo-950/20"
                    : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-950"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </Section>

      <Section
        id="catalog-grid"
        className="py-6 pb-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col justify-start"
      >
        {isError && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex items-center justify-between shadow-sm">
            <span>{loadingMessage || "Gagal memuat produk."}</span>
            <button
              type="button"
              onClick={handleRefetch}
              className="px-3 py-1 bg-rose-200 hover:bg-rose-300 text-rose-900 rounded-lg font-semibold text-xs transition-colors cursor-pointer"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-[460px] rounded-3xl bg-white border border-zinc-200/80 p-5 space-y-4 animate-pulse"
              >
                <div className="w-full h-52 bg-zinc-200 rounded-2xl" />
                <div className="w-20 h-4 bg-zinc-200 rounded-full" />
                <div className="w-3/4 h-6 bg-zinc-200 rounded-md" />
                <div className="w-full h-12 bg-zinc-200 rounded-md" />
                <div className="w-1/2 h-6 bg-zinc-200 rounded-md pt-4" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="p-16 text-center bg-white rounded-3xl border border-zinc-200 shadow-sm space-y-4 my-8">
            <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-2xl mx-auto text-zinc-400">
              🔍
            </div>
            <h3 className="text-xl font-bold text-zinc-900">
              Tidak Ada Produk Ditemukan
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
              Tidak ada produk yang cocok dengan kategori &ldquo;{selectedCategory}&rdquo; atau kata kunci pencarian Anda.
            </p>
            <button
              type="button"
              onClick={() => {
                handleSelectCategory("Semua");
                handleSearchChange("");
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-sm"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                radius="3xl"
                border
                bgColor="bg-white"
                className="group flex flex-col justify-between p-0 overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border-zinc-200/80"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                  <img
                    src={product.coverImage}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-[#222144]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {product.badge}
                    </span>
                  )}
                  {product.category && (
                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-zinc-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {product.category}
                    </span>
                  )}
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-amber-400">
                        {"★".repeat(product.rating || 5)}
                        <span className="text-zinc-400 text-[11px] ml-1 font-medium">
                          ({product.rating || 5}.0)
                        </span>
                      </div>

                      <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
                        Sisa {product.promoQuota} Promo
                      </span>
                    </div>

                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-lg sm:text-xl font-bold text-zinc-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {product.title}
                      </h3>
                    </Link>

                    <p className="text-xs sm:text-sm text-zinc-500 line-clamp-2 leading-relaxed">
                      {product.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                    <div>
                      {product.originalPrice && (
                        <span className="block text-[11px] text-zinc-400 line-through">
                          {formatRupiah(product.originalPrice)}
                        </span>
                      )}
                      <span className="text-lg font-black text-[#222144]">
                        {formatRupiah(product.price)}
                      </span>
                    </div>

                    <Link
                      href={`/products/${product.slug}`}
                      className="rounded-xl bg-[#222144] hover:bg-blue-600 text-white px-4 py-2.5 text-xs font-semibold transition-all shadow-sm active:scale-95"
                    >
                      Detail & Paket
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>

      <Footer />
    </main>
  );
}
