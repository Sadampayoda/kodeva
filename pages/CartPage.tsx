"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import type { UseCartReturn } from "@/hooks/useCart";

export type CartPageProps = Partial<UseCartReturn>;

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function CartPage(props: CartPageProps) {
  const {
    items = [],
    totals = {
      totalQuantity: 0,
      subtotal: 0,
      totalDiscount: 0,
      grandTotal: 0,
    },
    isInitialized = true,
    quotaWarning = null,
    handleUpdateQuantity = () => ({ success: true }),
    handleRemoveItem = () => {},
    handleClearCart = () => {},
    handleDismissWarning = () => {},
    handleGetTotalQuantityForProduct = () => 0,
  } = props;

  return (
    <main className="min-h-screen bg-[#f8f8fa] text-zinc-900 selection:bg-blue-600 selection:text-white pb-20">
      <Navbar theme="light" />

      <Section
        id="cart-section"
        className="pt-28 md:pt-36 pb-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col justify-start"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Beranda
              </Link>
              <span>/</span>
              <Link href="/products" className="hover:text-blue-600 transition-colors">
                Katalog
              </Link>
              <span>/</span>
              <span className="text-zinc-800 font-medium">Keranjang Belanja</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#222144] tracking-tight">
              Keranjang Belanja
            </h1>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={handleClearCart}
              className="self-start sm:self-auto text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3.5 py-2 rounded-xl transition-colors border border-rose-200"
            >
              Kosongkan Keranjang
            </button>
          )}
        </div>

        {quotaWarning && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start justify-between gap-3 shadow-sm animate-in fade-in">
            <div className="flex items-start gap-3">
              <span className="p-1 rounded-lg bg-amber-100 text-amber-700 mt-0.5">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </span>
              <div>
                <h4 className="text-sm font-bold text-amber-900">Perhatian Batas Kuota Promo</h4>
                <p className="text-xs sm:text-sm text-amber-800 mt-0.5 leading-relaxed">
                  {quotaWarning}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDismissWarning}
              aria-label="Tutup peringatan"
              className="text-amber-700 hover:text-amber-900 p-1 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {!isInitialized ? (
          <div className="space-y-4">
            <div className="h-28 bg-zinc-200/70 rounded-2xl animate-pulse" />
            <div className="h-28 bg-zinc-200/70 rounded-2xl animate-pulse" />
          </div>
        ) : items.length === 0 ? (
          <Card
            border
            bgColor="bg-white"
            radius="2xl"
            className="p-10 sm:p-16 text-center flex flex-col items-center justify-center max-w-xl mx-auto border-zinc-200 shadow-sm"
          >
            <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.75"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#222144] mb-2">
              Keranjang Belanja Masih Kosong
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mb-8 leading-relaxed">
              Anda belum menambahkan lisensi aplikasi atau starter kit ke dalam keranjang belanja.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 active:scale-95"
            >
              <span>Jelajahi Katalog Produk</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => {
                const totalForThisProduct = handleGetTotalQuantityForProduct(item.productId);
                const hasPromoDiscount = item.originalPrice && item.originalPrice > item.price;
                const itemTotal = item.price * item.quantity;
                const itemOriginalTotal = (item.originalPrice || item.price) * item.quantity;

                return (
                  <Card
                    key={item.id}
                    border
                    bgColor="bg-white"
                    radius="2xl"
                    className="p-4 sm:p-5 border-zinc-200/90 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <div className="w-full sm:w-28 h-24 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0 relative border border-zinc-100">
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-1.5 w-full">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                            Paket {item.tierName}
                          </span>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600">
                            Kuota Total: {item.promoQuota} lisensi
                          </span>
                        </div>

                        <Link
                          href={`/products/${item.slug}`}
                          className="block text-base sm:text-lg font-bold text-[#222144] hover:text-blue-600 transition-colors truncate"
                        >
                          {item.title}
                        </Link>

                        <div className="flex items-baseline gap-2">
                          <span className="text-sm sm:text-base font-extrabold text-[#222144]">
                            {formatRupiah(item.price)}
                          </span>
                          {hasPromoDiscount && item.originalPrice && (
                            <span className="text-xs text-zinc-400 line-through">
                              {formatRupiah(item.originalPrice)}
                            </span>
                          )}
                          <span className="text-[11px] text-zinc-500">/ lisensi</span>
                        </div>

                        <p className="text-[11px] text-zinc-500">
                          Total lisensi produk ini di keranjang:{" "}
                          <span className="font-semibold text-zinc-700">
                            {totalForThisProduct} dari {item.promoQuota}
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                        <div className="flex items-center border border-zinc-200 rounded-xl bg-zinc-50/50 p-1">
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            aria-label="Kurangi kuantitas"
                            className="w-8 h-8 rounded-lg bg-white border border-zinc-200 text-zinc-700 font-bold hover:bg-zinc-100 flex items-center justify-center transition-colors active:scale-95"
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-bold text-sm text-zinc-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={totalForThisProduct >= item.promoQuota}
                            aria-label="Tambah kuantitas"
                            className={`w-8 h-8 rounded-lg border font-bold flex items-center justify-center transition-colors active:scale-95 ${
                              totalForThisProduct >= item.promoQuota
                                ? "bg-zinc-100 border-zinc-200 text-zinc-300 cursor-not-allowed"
                                : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                            }`}
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-sm sm:text-base font-black text-blue-600">
                            {formatRupiah(itemTotal)}
                          </div>
                          {hasPromoDiscount && (
                            <div className="text-[10px] text-zinc-400 line-through">
                              {formatRupiah(itemOriginalTotal)}
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          aria-label="Hapus item"
                          className="text-xs text-rose-500 hover:text-rose-700 hover:underline flex items-center gap-1 font-medium transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}

              <div className="pt-3">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-600 hover:text-blue-600 transition-colors"
                >
                  <span>&larr;</span> Tambah Produk Lainnya
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 sticky top-28">
              <Card
                border
                bgColor="bg-white"
                radius="2xl"
                className="p-6 border-zinc-200/90 shadow-sm space-y-6"
              >
                <h3 className="text-lg font-black text-[#222144]">Ringkasan Belanja</h3>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between text-zinc-600">
                    <span>Total Kuantitas Lisensi</span>
                    <span className="font-bold text-zinc-900">{totals.totalQuantity} Lisensi</span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-600">
                    <span>Subtotal Produk</span>
                    <span className="font-semibold text-zinc-900">
                      {formatRupiah(totals.subtotal + totals.totalDiscount)}
                    </span>
                  </div>

                  {totals.totalDiscount > 0 && (
                    <div className="flex items-center justify-between text-emerald-600 font-semibold">
                      <span>Hemat Diskon Promo</span>
                      <span>-{formatRupiah(totals.totalDiscount)}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
                    <span className="text-sm font-bold text-zinc-900">Total Tagihan</span>
                    <span className="text-xl sm:text-2xl font-black text-blue-600">
                      {formatRupiah(totals.grandTotal)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-blue-500/25 active:scale-[0.99]"
                >
                  <span>Lanjut ke Pembayaran</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>

                <div className="pt-2 border-t border-zinc-100 space-y-2 text-[11px] text-zinc-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Full Source Code siap pakai & lisensi unik instan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Simulasi pembayaran tanpa gateway live</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Keranjang tersimpan otomatis di perangkat Anda</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </Section>

      <Footer />
    </main>
  );
}
