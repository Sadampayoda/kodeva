"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import { PaymentMethod, PaymentSimulationStatus } from "@/enums/payment.enum";
import type { UseCheckoutReturn } from "@/hooks/useCheckout";

export type CheckoutPageProps = Partial<UseCheckoutReturn>;

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

const paymentMethodLabels: Record<PaymentMethod, { label: string; desc: string }> = {
  [PaymentMethod.QRIS]: {
    label: "QRIS Instant",
    desc: "Scan QR via GoPay, OVO, Dana, BCA, ShopeePay",
  },
  [PaymentMethod.BCA_VA]: {
    label: "BCA Virtual Account",
    desc: "Verifikasi otomatis 24 jam",
  },
  [PaymentMethod.MANDIRI_VA]: {
    label: "Mandiri Virtual Account",
    desc: "Verifikasi otomatis dari Livin Mandiri",
  },
  [PaymentMethod.CREDIT_CARD]: {
    label: "Kartu Kredit / Debit",
    desc: "Visa, Mastercard, JCB (Simulasi)",
  },
};

export default function CheckoutPage(props: CheckoutPageProps) {
  const {
    items = [],
    totals = {
      totalQuantity: 0,
      subtotal: 0,
      totalDiscount: 0,
      grandTotal: 0,
    },
    formData = {
      fullName: "",
      email: "",
      whatsapp: "",
      paymentMethod: PaymentMethod.QRIS,
    },
    formErrors = {},
    simulationMode = "success",
    paymentStatus = PaymentSimulationStatus.IDLE,
    errorMessage = null,
    receipt = null,
    handleInputChange = () => {},
    handleSelectPaymentMethod = () => {},
    handleToggleSimulationMode = () => {},
    handleSimulatePayment = () => {},
    handleResetCheckout = () => {},
  } = props;

  const isProcessing = paymentStatus === PaymentSimulationStatus.PROCESSING;
  const isSuccess = paymentStatus === PaymentSimulationStatus.SUCCESS && receipt !== null;

  if (isSuccess && receipt) {
    return (
      <main className="min-h-screen bg-[#f8f8fa] text-zinc-900 selection:bg-blue-600 selection:text-white pb-20">
        <Navbar theme="light" />

        <Section
          id="checkout-receipt"
          className="pt-28 md:pt-36 pb-16 px-4 sm:px-8 md:px-12 max-w-3xl mx-auto flex flex-col justify-start"
        >
          <div className="text-center space-y-3 mb-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-sm">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Transaksi Berhasil (Simulasi)
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#222144]">
              Terima Kasih atas Pembelian Anda!
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto">
              Lisensi aplikasi dan source code Anda telah aktif dan dapat langsung digunakan. Salinan faktur dikirimkan ke{" "}
              <span className="font-semibold text-zinc-900">{receipt.buyer.email}</span>.
            </p>
          </div>

          <Card
            border
            bgColor="bg-white"
            radius="2xl"
            className="p-6 sm:p-8 border-zinc-200 shadow-sm space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
              <div>
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Nomor Faktur
                </span>
                <p className="text-base sm:text-lg font-black text-[#222144]">{receipt.orderId}</p>
              </div>
              <div className="sm:text-right">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Waktu Transaksi
                </span>
                <p className="text-xs sm:text-sm font-semibold text-zinc-700">{receipt.date}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-zinc-200 text-xs sm:text-sm">
              <div>
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  Data Pembeli
                </span>
                <p className="font-bold text-zinc-900">{receipt.buyer.fullName}</p>
                <p className="text-zinc-600">{receipt.buyer.email}</p>
                {receipt.buyer.whatsapp && (
                  <p className="text-zinc-600">{receipt.buyer.whatsapp}</p>
                )}
              </div>
              <div>
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  Metode Pembayaran
                </span>
                <p className="font-bold text-zinc-900">
                  {paymentMethodLabels[receipt.buyer.paymentMethod]?.label || receipt.buyer.paymentMethod}
                </p>
                <span className="inline-block mt-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Lunas
                </span>
              </div>
            </div>

            <div className="space-y-3 pb-6 border-b border-zinc-200">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                Item & Lisensi yang Diterbitkan
              </span>

              {receipt.items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-xs sm:text-sm text-zinc-900 truncate">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                        {item.tierName}
                      </span>
                      <span className="text-[11px] text-zinc-500">
                        {item.quantity} lisensi &times; {formatRupiah(item.price)}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-xs sm:text-sm text-zinc-900 flex-shrink-0">
                    {formatRupiah(item.price * item.quantity)}
                  </span>
                </div>
              ))}

              <div className="pt-3 space-y-2">
                <span className="text-xs font-bold text-zinc-800 block">
                  Serial Key Lisensi Aktif:
                </span>
                <div className="space-y-1.5">
                  {receipt.licenseKeys.map((key, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between font-mono text-xs bg-zinc-900 text-emerald-400 px-3 py-2 rounded-lg"
                    >
                      <span>{key}</span>
                      <span className="text-[10px] uppercase font-sans text-zinc-400">Lisensi #{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="font-semibold text-zinc-900">
                  {formatRupiah(receipt.subtotal + receipt.totalDiscount)}
                </span>
              </div>
              {receipt.totalDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-semibold">
                  <span>Diskon Promo</span>
                  <span>-{formatRupiah(receipt.totalDiscount)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
                <span className="font-bold text-zinc-900 text-sm">Total Dibayar</span>
                <span className="font-black text-xl text-blue-600">
                  {formatRupiah(receipt.grandTotal)}
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm transition-colors text-center active:scale-95"
              >
                Cetak Bukti Pembayaran
              </button>
              <Link
                href="/products"
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-colors text-center shadow-md shadow-blue-500/20 active:scale-95"
              >
                Belanja Produk Lain
              </Link>
            </div>
          </Card>
        </Section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f8fa] text-zinc-900 selection:bg-blue-600 selection:text-white pb-20">
      <Navbar theme="light" />

      <Section
        id="checkout-form"
        className="pt-28 md:pt-36 pb-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col justify-start"
      >
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-blue-600 transition-colors">
              Keranjang
            </Link>
            <span>/</span>
            <span className="text-zinc-800 font-medium">Checkout</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#222144] tracking-tight">
            Checkout & Pembayaran
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Lengkapi data pembeli untuk menerima akses source code dan serial lisensi aplikasi.
          </p>
        </div>

        {items.length === 0 ? (
          <Card
            border
            bgColor="bg-white"
            radius="2xl"
            className="p-10 sm:p-14 text-center max-w-lg mx-auto border-zinc-200 shadow-sm"
          >
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#222144] mb-2">
              Keranjang Belanja Kosong
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 mb-6">
              Tidak ada item yang dapat dicheckout. Silakan pilih produk dari katalog terlebih dahulu.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 active:scale-95"
            >
              <span>Lihat Katalog Produk</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start justify-between gap-3 shadow-sm animate-in fade-in">
                  <div className="flex items-start gap-3">
                    <span className="p-1 rounded-lg bg-rose-100 text-rose-600 mt-0.5">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-rose-900">Pembayaran Tidak Berhasil</h4>
                      <p className="text-xs sm:text-sm text-rose-800 mt-0.5 leading-relaxed">
                        {errorMessage}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetCheckout}
                    className="text-xs font-semibold text-rose-700 hover:text-rose-900 bg-rose-100 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}

              {formErrors.general && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-800 font-medium">
                  {formErrors.general}
                </div>
              )}

              <Card
                border
                bgColor="bg-white"
                radius="2xl"
                className="p-6 border-zinc-200/90 shadow-sm space-y-5"
              >
                <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#222144]">
                    Data Pembeli & Kontak
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Nama Lengkap <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan nama lengkap Anda"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 ${
                        formErrors.fullName
                          ? "border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-rose-500/20"
                          : "border-zinc-200 bg-zinc-50/50 focus:border-blue-500 focus:ring-blue-500/20 focus:bg-white"
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="mt-1 text-[11px] text-rose-600 font-medium">
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Alamat Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="contoh: nama@domain.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 ${
                        formErrors.email
                          ? "border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-rose-500/20"
                          : "border-zinc-200 bg-zinc-50/50 focus:border-blue-500 focus:ring-blue-500/20 focus:bg-white"
                      }`}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-[11px] text-rose-600 font-medium">
                        {formErrors.email}
                      </p>
                    )}
                    <p className="mt-1 text-[11px] text-zinc-400">
                      Link download repository dan lisensi resmi akan dikirim ke email ini.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Nomor WhatsApp <span className="text-zinc-400 font-normal">(Opsional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="contoh: 081234567890"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 ${
                        formErrors.whatsapp
                          ? "border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-rose-500/20"
                          : "border-zinc-200 bg-zinc-50/50 focus:border-blue-500 focus:ring-blue-500/20 focus:bg-white"
                      }`}
                    />
                    {formErrors.whatsapp && (
                      <p className="mt-1 text-[11px] text-rose-600 font-medium">
                        {formErrors.whatsapp}
                      </p>
                    )}
                  </div>
                </div>
              </Card>

              <Card
                border
                bgColor="bg-white"
                radius="2xl"
                className="p-6 border-zinc-200/90 shadow-sm space-y-5"
              >
                <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#222144]">
                    Metode Pembayaran (Simulasi)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.values(PaymentMethod).map((method) => {
                    const meta = paymentMethodLabels[method];
                    const isSelected = formData.paymentMethod === method;
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => handleSelectPaymentMethod(method)}
                        className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 active:scale-[0.98] ${
                          isSelected
                            ? "border-blue-600 bg-blue-50/40 shadow-sm ring-2 ring-blue-500/20"
                            : "border-zinc-200 hover:border-zinc-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs sm:text-sm font-bold text-zinc-900">
                            {meta.label}
                          </span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? "border-blue-600 bg-blue-600"
                                : "border-zinc-300 bg-white"
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </div>
                        <span className="text-[11px] text-zinc-500 leading-tight">
                          {meta.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Card>

              <Card
                border
                bgColor="bg-white"
                radius="2xl"
                className="p-6 border-zinc-200/90 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-xs font-bold flex items-center justify-center">
                      3
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#222144]">
                      Mode Simulasi Pembayaran
                    </h3>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Simulator
                  </span>
                </div>

                <p className="text-xs text-zinc-500">
                  Pilih skenario pengujian pembayaran di bawah untuk menguji respons sistem:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleSimulationMode("success")}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      simulationMode === "success"
                        ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20"
                        : "border-zinc-200 hover:border-zinc-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full bg-emerald-500" />
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-zinc-900">
                          Simulasi Sukses
                        </p>
                        <p className="text-[10px] text-zinc-500">
                          Hasilkan lisensi & faktur
                        </p>
                      </div>
                    </div>
                    {simulationMode === "success" && (
                      <span className="text-emerald-700 text-xs font-bold">&check;</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleSimulationMode("failed")}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      simulationMode === "failed"
                        ? "border-rose-600 bg-rose-50/60 ring-2 ring-rose-500/20"
                        : "border-zinc-200 hover:border-zinc-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500" />
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-zinc-900">
                          Simulasi Gagal
                        </p>
                        <p className="text-[10px] text-zinc-500">
                          Uji penanganan error
                        </p>
                      </div>
                    </div>
                    {simulationMode === "failed" && (
                      <span className="text-rose-700 text-xs font-bold">&check;</span>
                    )}
                  </button>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-5 sticky top-28 space-y-4">
              <Card
                border
                bgColor="bg-white"
                radius="2xl"
                className="p-6 border-zinc-200/90 shadow-sm space-y-5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <h3 className="text-base sm:text-lg font-bold text-[#222144]">
                    Ringkasan Pesanan
                  </h3>
                  <Link
                    href="/cart"
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    Ubah
                  </Link>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-zinc-900 truncate">{item.title}</p>
                        <p className="text-[11px] text-zinc-500">
                          {item.quantity} lisensi &bull; Paket {item.tierName}
                        </p>
                      </div>
                      <span className="font-extrabold text-zinc-900 flex-shrink-0">
                        {formatRupiah(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2.5 pt-3 border-t border-zinc-100 text-xs sm:text-sm">
                  <div className="flex items-center justify-between text-zinc-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-zinc-900">
                      {formatRupiah(totals.subtotal + totals.totalDiscount)}
                    </span>
                  </div>

                  {totals.totalDiscount > 0 && (
                    <div className="flex items-center justify-between text-emerald-600 font-semibold">
                      <span>Diskon Promo</span>
                      <span>-{formatRupiah(totals.totalDiscount)}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
                    <span className="text-sm font-bold text-zinc-900">Total Pembayaran</span>
                    <span className="text-xl sm:text-2xl font-black text-blue-600">
                      {formatRupiah(totals.grandTotal)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleSimulatePayment}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-sm sm:text-base text-white transition-all shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 ${
                    isProcessing
                      ? "bg-blue-400 cursor-wait shadow-none"
                      : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/25"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      <span>Memproses Pembayaran...</span>
                    </>
                  ) : (
                    <>
                      <span>Bayar Sekarang ({formatRupiah(totals.grandTotal)})</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-zinc-400 text-center leading-relaxed">
                  Dengan mengklik &quot;Bayar Sekarang&quot;, Anda menyetujui Ketentuan Lisensi Produk dan Kebijakan Privasi Kodeva.
                </p>
              </Card>
            </div>
          </div>
        )}
      </Section>

      <Footer />
    </main>
  );
}
