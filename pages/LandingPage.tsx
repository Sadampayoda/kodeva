"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import type { UseLandingPageReturn } from "@/hooks/useLandingPage";

export type LandingPageProps = Partial<UseLandingPageReturn>;

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function LandingPage(props: LandingPageProps) {
  const {
    hero = {
      badgeText: "Solusi Digital Modern",
      title: "Bangun Bisnis Digital Lebih Cepat & Terukur",
      subtitle:
        "Dapatkan website profesional, source code aplikasi siap pakai, dan template premium untuk mengakselerasi pertumbuhan bisnis Anda tanpa ribet.",
      backgroundImage:
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2070&q=80",
      ctaText: "Jelajahi Produk Unggulan",
      ctaLink: "#featured-products",
    },
    featuredProducts = [],
    testimonials = [],
    faqs = [],
    activeFaqId = null,
    leadForm = { name: "", contact: "", message: "", hp: "" },
    leadErrors = {},
    leadSuccess = false,
    leadSubmitting = false,
    isLoading = false,
    isError = false,
    loadingMessage = "",
    handleToggleFaq = () => {},
    handleInputChange = () => {},
    handleSubmitLead = () => {},
    handleResetLeadForm = () => {},
    handleRefetch = () => {},
  } = props;

  return (
    <main className="min-h-screen bg-[#f8f8fa] text-zinc-900 selection:bg-blue-600 selection:text-white">
      <Navbar theme="dark" className="!fixed !bg-transparent" />

      {isError && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-xl p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex items-center justify-between shadow-xl">
          <span>{loadingMessage || "Gagal menyinkronkan data Sanity."}</span>
          <button
            type="button"
            onClick={handleRefetch}
            className="px-3 py-1 bg-rose-200 hover:bg-rose-300 text-rose-900 rounded-lg font-semibold text-xs transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      )}

      <Section id="hero" className="p-3 sm:p-5 md:p-8 flex flex-col">
        <Card
          radius="3xl"
          bgImage={hero.backgroundImage}
          overlay="linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.75))"
          className="relative w-full flex-1 min-h-[92vh] flex flex-col justify-between text-white shadow-2xl overflow-hidden"
        >
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pt-36 md:pt-48 pb-16 flex-1 flex flex-col justify-center">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-white border border-white/25 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {hero.badgeText}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-black tracking-tight text-white leading-[1.08] drop-shadow-sm">
                {hero.title}
              </h1>

              <p className="max-w-xl text-sm sm:text-base text-white/85 leading-relaxed font-normal">
                {hero.subtitle}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href={hero.ctaLink || "#featured-products"}
                  className="rounded-full bg-white text-zinc-950 px-7 py-3.5 text-xs sm:text-sm font-bold hover:bg-zinc-100 hover:shadow-xl active:scale-95 transition-all shadow-md inline-flex items-center gap-2"
                >
                  <span>{hero.ctaText}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>

                <Link
                  href="/blog"
                  className="rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white px-6 py-3.5 text-xs sm:text-sm font-semibold hover:bg-white/25 transition-all"
                >
                  Baca Artikel Blog
                </Link>
              </div>
            </div>
          </div>

          <div className="pb-8 flex justify-center items-center gap-2 z-10">
            <span className="w-8 h-1.5 rounded-full bg-white transition-all shadow-sm" />
            <span className="w-2 h-1.5 rounded-full bg-white/40" />
            <span className="w-2 h-1.5 rounded-full bg-white/40" />
          </div>
        </Card>
      </Section>

      <Section
        id="featured-products"
        className="py-16 md:py-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col justify-center"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Katalog Pilihan
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#222144]">
              Produk Unggulan
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Solusi source code aplikasi dan template website berkualitas tinggi yang siap dipasang dan dikembangkan untuk bisnis Anda.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#lead-capture"
              className="text-xs sm:text-sm font-semibold text-zinc-600 hover:text-blue-600 transition-colors"
            >
              Butuh Kustomisasi Khusus? &rarr;
            </a>
          </div>
        </div>

        {isLoading && featuredProducts.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
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
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      {"★".repeat(product.rating || 5)}
                      <span className="text-zinc-400 text-[11px] ml-1 font-medium">
                        ({product.rating || 5}.0)
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-zinc-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {product.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-500 line-clamp-2 leading-relaxed">
                      {product.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
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

                    <a
                      href="#lead-capture"
                      className="rounded-xl bg-[#222144] hover:bg-blue-600 text-white px-4 py-2.5 text-xs font-semibold transition-all shadow-sm active:scale-95"
                    >
                      Beli Lisensi
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>

      <Section
        id="testimonials"
        className="py-16 md:py-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col justify-center"
      >
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Testimoni Klien
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#222144]">
            Dipercaya Oleh Para Founder
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Kisah sukses para pemilik bisnis dan developer yang telah membangun aplikasi mereka menggunakan platform Kodeva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi) => (
            <Card
              key={testi.id}
              radius="3xl"
              border
              bgColor="bg-white"
              className="p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 border-zinc-200/80"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400 text-sm">
                  {"★".repeat(testi.rating || 5)}
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed italic">
                  &ldquo;{testi.content}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-zinc-100">
                <img
                  src={testi.avatar}
                  alt={testi.name}
                  className="w-11 h-11 rounded-full object-cover flex-shrink-0 border border-zinc-200"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-zinc-900 leading-snug">
                    {testi.name}
                  </h4>
                  <p className="text-[11px] text-zinc-500 truncate">
                    {testi.role}
                    {testi.company && ` • ${testi.company}`}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="faq"
        className="py-16 md:py-24 px-4 sm:px-8 md:px-12 max-w-4xl mx-auto flex flex-col justify-center"
      >
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Pertanyaan Umum
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#222144]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Temukan jawaban atas pertanyaan paling umum mengenai lisensi, bantuan teknis, dan manajemen konten CMS.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = activeFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white border-blue-200 shadow-md ring-1 ring-blue-100"
                    : "bg-white/70 border-zinc-200 hover:border-zinc-300 hover:bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleToggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-zinc-900 leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-blue-600 text-white rotate-180"
                        : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
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
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        id="lead-capture"
        className="py-16 md:py-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col justify-center"
      >
        <Card
          radius="3xl"
          bgColor="bg-[#0f0e26]"
          className="relative p-8 sm:p-12 lg:p-16 text-white overflow-hidden shadow-2xl border border-white/10"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block text-[10px] font-bold tracking-wider uppercase bg-white/15 px-3 py-1 rounded-full border border-white/20">
                Konsultasi Gratis
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12]">
                Tertarik Mengembangkan
                <br />
                Solusi Digital Sendiri?
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-lg">
                Tinggalkan kontak Anda. Tim spesialis Kodeva akan menghubungi Anda dalam waktu maksimal 1x24 jam untuk mendiskusikan kebutuhan produk, demo langsung, dan penawaran terbaik.
              </p>

              <div className="space-y-3 pt-2 text-xs text-zinc-300">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    ✓
                  </span>
                  <span>Source code terstruktur, clean, & bebas error</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    ✓
                  </span>
                  <span>Integrasi Sanity Headless CMS instan</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    ✓
                  </span>
                  <span>Pendampingan teknis deployment server</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white/10 backdrop-blur-xl p-7 sm:p-9 rounded-3xl border border-white/15 shadow-2xl">
                {leadSuccess ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center text-2xl mx-auto">
                      ✓
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Permintaan Terkirim!
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto">
                      Terima kasih atas minat Anda. Data Anda telah tersimpan dan tim marketing kami akan segera menghubungi Anda melalui kontak yang dicantumkan.
                    </p>
                    <button
                      type="button"
                      onClick={handleResetLeadForm}
                      className="mt-4 px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-semibold transition-colors"
                    >
                      Kirim Pesan Lainnya
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitLead} className="space-y-4">
                    <div className="hidden">
                      <input
                        type="text"
                        name="hp"
                        value={leadForm.hp || ""}
                        onChange={(e) => handleInputChange("hp", e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-zinc-200">
                        Nama Lengkap <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Budi Santoso"
                        value={leadForm.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-zinc-400 text-xs sm:text-sm focus:outline-none focus:ring-2 transition-all ${
                          leadErrors.name
                            ? "border-rose-400 focus:ring-rose-400/50"
                            : "border-white/20 focus:ring-blue-400/50 focus:border-white/40"
                        }`}
                      />
                      {leadErrors.name && (
                        <p className="text-[11px] text-rose-300 font-medium">
                          {leadErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-zinc-200">
                        Email atau Nomor WhatsApp <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="nama@email.com atau 08123456789"
                        value={leadForm.contact}
                        onChange={(e) => handleInputChange("contact", e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-zinc-400 text-xs sm:text-sm focus:outline-none focus:ring-2 transition-all ${
                          leadErrors.contact
                            ? "border-rose-400 focus:ring-rose-400/50"
                            : "border-white/20 focus:ring-blue-400/50 focus:border-white/40"
                        }`}
                      />
                      {leadErrors.contact && (
                        <p className="text-[11px] text-rose-300 font-medium">
                          {leadErrors.contact}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-zinc-200">
                        Kebutuhan / Proyek (Opsional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Ceritakan gambaran singkat kebutuhan atau produk yang Anda incar..."
                        value={leadForm.message || ""}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-zinc-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-white/40 resize-none transition-all"
                      />
                    </div>

                    {leadErrors.general && (
                      <p className="text-xs text-rose-300 bg-rose-500/20 border border-rose-400/40 p-3 rounded-xl">
                        {leadErrors.general}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={leadSubmitting}
                      className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-blue-600/30 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                    >
                      {leadSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Mengirim Permintaan...</span>
                        </>
                      ) : (
                        <span>Dapatkan Konsultasi & Penawaran</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Card>
      </Section>

      <Footer />
    </main>
  );
}

