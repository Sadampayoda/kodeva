"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import type { UseProductDetailReturn } from "@/hooks/useProductDetail";

export type ProductDetailPageProps = Partial<UseProductDetailReturn>;

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProductDetailPage(props: ProductDetailPageProps) {
  const {
    product,
    selectedTier,
    activeScreenshot = "",
    quantity = 1,
    inCartCount = 0,
    remainingPromoQuota = 0,
    addedSuccess = false,
    actionError = null,
    isLoading = false,
    isError = false,
    loadingMessage = "",
    handleSelectTier = () => {},
    handleSelectScreenshot = () => {},
    handleQuantityChange = () => {},
    handleAddToCart = () => {},
    handleBuyNow = () => {},
    handleRefetch = () => {},
  } = props;

  return (
    <main className="min-h-screen bg-[#f8f8fa] text-zinc-900 selection:bg-blue-600 selection:text-white pb-20 sm:pb-0">
      <Navbar theme="light" />

      <Section
        id="product-detail"
        className="pt-28 md:pt-36 pb-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col justify-start"
      >
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-500 hover:text-blue-600 transition-colors"
          >
            <span>&larr;</span> Kembali ke Katalog Produk
          </Link>
        </div>

        {isError && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex items-center justify-between shadow-sm">
            <span>{loadingMessage || "Gagal memuat detail produk."}</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-pulse">
            <div className="lg:col-span-7 space-y-4">
              <div className="w-full aspect-[16/10] bg-zinc-200 rounded-3xl" />
              <div className="flex gap-3">
                <div className="w-24 h-16 bg-zinc-200 rounded-xl" />
                <div className="w-24 h-16 bg-zinc-200 rounded-xl" />
                <div className="w-24 h-16 bg-zinc-200 rounded-xl" />
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div className="w-24 h-6 bg-zinc-200 rounded-full" />
              <div className="w-3/4 h-10 bg-zinc-200 rounded-xl" />
              <div className="w-1/2 h-8 bg-zinc-200 rounded-md" />
              <div className="w-full h-32 bg-zinc-200 rounded-2xl" />
            </div>
          </div>
        ) : !product ? (
          <div className="p-16 text-center bg-white rounded-3xl border border-zinc-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900">
              Produk Tidak Ditemukan
            </h2>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">
              Produk yang Anda cari mungkin telah dinonaktifkan atau tautan yang Anda tuju salah.
            </p>
            <Link
              href="/products"
              className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
            >
              Lihat Katalog Lainnya
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-7 space-y-6">
              <Card
                radius="3xl"
                border
                bgColor="bg-white"
                className="p-0 overflow-hidden shadow-lg border-zinc-200/80"
              >
                <div className="relative aspect-[16/10] bg-zinc-100 overflow-hidden">
                  <img
                    src={activeScreenshot || product.coverImage}
                    alt={product.title}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-[#222144]/90 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                      {product.badge}
                    </span>
                  )}
                </div>
              </Card>

              {product.screenshots && product.screenshots.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                    Screenshot Fitur Aplikasi
                  </h4>
                  <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                    {product.screenshots.map((shot, idx) => {
                      const isSelected = activeScreenshot === shot;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectScreenshot(shot)}
                          className={`relative w-28 h-20 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                            isSelected
                              ? "border-blue-600 ring-2 ring-blue-500/30 scale-105"
                              : "border-zinc-200 hover:border-zinc-300 opacity-75 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={shot}
                            alt={`Fitur ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="bg-white p-7 sm:p-9 rounded-3xl border border-zinc-200/80 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#222144]">
                  Tentang Produk & Lisensi
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {product.fullDescription || product.excerpt}
                </p>

                {product.demoUrl && (
                  <div className="pt-2">
                    <a
                      href={product.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <span>Lihat Live Demo Aplikasi</span>
                      <span>&rarr;</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-7 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-lg space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                      {product.category || "Produk"}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      {"★".repeat(product.rating || 5)}
                      <span className="text-zinc-400 font-semibold ml-1">
                        ({product.rating || 5}.0)
                      </span>
                    </div>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black text-[#222144] tracking-tight leading-snug">
                    {product.title}
                  </h1>

                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-amber-900 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                      <span>Sisa Kuota Promo:</span>
                    </div>
                    <span className="font-black text-rose-600 text-sm">
                      {remainingPromoQuota} Lisensi
                    </span>
                  </div>

                  {inCartCount > 0 && (
                    <p className="text-[11px] text-zinc-500 italic">
                      (Anda sudah memiliki {inCartCount} lisensi produk ini di dalam keranjang)
                    </p>
                  )}
                </div>

                <div className="space-y-3 pt-2 border-t border-zinc-100">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Pilih Paket Lisensi:
                  </label>

                  <div className="space-y-2.5">
                    {product.tiers &&
                      product.tiers.map((tierOption) => {
                        const isSelected = selectedTier?.tier === tierOption.tier;
                        return (
                          <div
                            key={tierOption.tier}
                            onClick={() => handleSelectTier(tierOption.tier)}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                              isSelected
                                ? "border-blue-600 bg-blue-50/50 shadow-md ring-1 ring-blue-500/20"
                                : "border-zinc-200 hover:border-zinc-300 bg-white"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <span
                                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                    isSelected
                                      ? "border-blue-600 bg-blue-600"
                                      : "border-zinc-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                  )}
                                </span>
                                <span className="text-xs sm:text-sm font-bold text-zinc-900">
                                  {tierOption.name}
                                </span>
                              </div>

                              <span className="text-xs sm:text-sm font-black text-[#222144]">
                                {formatRupiah(tierOption.price)}
                              </span>
                            </div>

                            {isSelected && (
                              <div className="mt-3 pt-3 border-t border-blue-100 text-[11px] text-zinc-600 space-y-1.5 animate-in fade-in">
                                {tierOption.features.map((feat, idx) => (
                                  <div key={idx} className="flex items-center gap-1.5">
                                    <span className="text-emerald-600 font-bold">✓</span>
                                    <span>{feat}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold text-zinc-500">
                      Harga Total Paket:
                    </span>
                    <div className="text-right">
                      {selectedTier?.originalPrice && (
                        <span className="block text-xs text-zinc-400 line-through">
                          {formatRupiah(selectedTier.originalPrice * quantity)}
                        </span>
                      )}
                      <span className="text-2xl sm:text-3xl font-black text-[#222144]">
                        {formatRupiah((selectedTier?.price || product.price) * quantity)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-2">
                    <span className="text-xs font-bold text-zinc-700">
                      Jumlah Lisensi:
                    </span>
                    <div className="flex items-center border border-zinc-200 rounded-xl bg-zinc-50 p-1">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center font-bold text-xs text-zinc-700 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-bold text-xs text-zinc-900">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= remainingPromoQuota}
                        className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center font-bold text-xs text-zinc-700 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {actionError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                      {actionError}
                    </div>
                  )}

                  {addedSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-between">
                      <span>Produk berhasil dimasukkan ke keranjang!</span>
                      <Link href="/cart" className="font-bold underline">
                        Buka Keranjang
                      </Link>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      disabled={remainingPromoQuota === 0}
                      className="w-full py-3.5 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 text-zinc-900 font-bold text-xs transition-all active:scale-95 cursor-pointer"
                    >
                      + Keranjang
                    </button>

                    <button
                      type="button"
                      onClick={handleBuyNow}
                      disabled={remainingPromoQuota === 0}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#222144] hover:bg-blue-600 disabled:opacity-50 text-white font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      Beli Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Section>

      <Footer />
    </main>
  );
}
