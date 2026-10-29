"use client";

import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Link from "next/link";

// Data Kategori Sesuai Gambar
const categories = [
  {
    id: "travel",
    title: "Travel",
    desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna.",
    bgImage:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "adventure",
    title: "Adventure",
    desc: "Sit facilisi vitae varius amet posuere turpis sed turpis amet condimentum risus dolor aliquam sed etiam.",
    bgImage:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "gear",
    title: "Gear",
    desc: "Imperdiet tellus tempor bibendum accumsan commodo nunc feugiat nec facilisi habitasse semper et id.",
    bgImage:
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=900&q=80",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar Global */}
      <Navbar theme="dark" className="!fixed !bg-transparent" />

      {/* ================= SECTION 1: HERO ================= */}
      <Section id="hero" className="p-3 sm:p-5 md:p-8 flex flex-col">
        <Card
          radius="3xl"
          bgImage="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2070&q=80"
          overlay="linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.45))"
          className="relative w-full flex-1 min-h-[92vh] flex flex-col justify-between text-white shadow-2xl"
        >
          {/* Hero Content */}
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pt-36 md:pt-48 pb-12 flex-1 flex flex-col justify-center">
            <div className="max-w-2xl space-y-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-semibold text-zinc-950 shadow-sm">
                  <svg className="w-3.5 h-3.5 fill-zinc-950" viewBox="0 0 24 24">
                    <path d="M14 6l-3.8 5.7 2.3 3.5L8 20h12l-6-14z" />
                    <path d="M4 20l5-7.5L11 16l-2.7 4H4z" opacity="0.6" />
                  </svg>
                  Adventure
                </span>
                <span className="text-xs font-medium text-white/90 tracking-wide">
                  Sep 1, 2023
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight text-white leading-[1.12]">
                Conquer the wild:
                <br />
                Exploring terrains and
                <br />
                conquering nature
              </h1>

              <p className="max-w-md text-xs sm:text-sm text-white/80 leading-relaxed font-normal pt-1">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua ut
                enim ad minim veniam.
              </p>
            </div>
          </div>

          {/* Dots Carousel */}
          <div className="pb-7 flex justify-center items-center gap-2 z-10">
            <span className="w-6 h-1.5 rounded-full bg-white transition-all shadow-sm" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 hover:bg-white/90 transition-all cursor-pointer" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 hover:bg-white/90 transition-all cursor-pointer" />
          </div>
        </Card>
      </Section>

      {/* ================= SECTION 2: ARTICLE CATEGORIES ================= */}
      <Section
        id="categories"
        className="py-16 md:py-24 px-6 sm:px-10 md:px-14 max-w-7xl mx-auto flex flex-col justify-center"
      >
        {/* Header Kategori */}
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950">
            Article categories
          </h2>

          <Link
            href="/articles"
            className="rounded-full border border-zinc-200/90 px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-zinc-700 hover:text-zinc-950 hover:border-zinc-400 hover:bg-zinc-50 transition-all"
          >
            Browse all articles
          </Link>
        </div>

        {/* Grid 3 Kartu Kategori (Menggunakan Component Card) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <Card
              key={cat.id}
              radius="3xl"
              bgImage={cat.bgImage}
              overlay="linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.7))"
              className="group relative h-[380px] sm:h-[420px] lg:h-[440px] p-6 sm:p-7 flex flex-col justify-between text-white cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Tombol Panah Kanan Atas */}
              <div className="flex justify-end">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45">
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
                      d="M7 17L17 7M17 7H7M17 7V17"
                    />
                  </svg>
                </span>
              </div>

              {/* Konten Judul & Deskripsi Kategori */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed max-w-xs line-clamp-3">
                  {cat.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ================= SECTION 3: NEWSLETTER SECTION ================= */}
      <Section
        id="newsletter"
        className="py-12 md:py-20 px-4 sm:px-8 md:px-14 max-w-7xl mx-auto flex flex-col justify-center"
      >
        <Card
          radius="3xl"
          bgColor="bg-black"
          className="relative p-8 sm:p-12 lg:p-16 text-white overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Kolom Kiri: Teks & Form Input Pill */}
            <div className="lg:col-span-7 space-y-6 z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-white leading-[1.15]">
                Subscribe to our newsletter to
                <br />
                receive our daily news
              </h2>

              <p className="text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua ut
                enim ad minim proin.
              </p>

              {/* Input Form Pill Sesuai Gambar */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center bg-white rounded-full p-1.5 max-w-md shadow-lg border border-white/10"
              >
                {/* Ikon Mail / @ */}
                <div className="pl-4 pr-2 text-zinc-400">
                  <svg
                    className="w-4 h-4 text-zinc-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none px-2"
                  required
                />

                <button
                  type="submit"
                  className="rounded-full bg-zinc-950 px-5 sm:px-6 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-all flex-shrink-0 active:scale-95"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Kolom Kanan: Mockup Laptop Perspektif 3D Sesuai Gambar */}
            <div className="lg:col-span-5 flex justify-center items-center relative py-4 lg:py-0">
              <div className="relative [perspective:1200px] w-full max-w-[440px]">
                {/* Laptop Angled 3D */}
                <div className="[transform:rotateY(-18deg)_rotateX(14deg)_rotateZ(2deg)] transition-all duration-500 hover:[transform:rotateY(-10deg)_rotateX(8deg)_rotateZ(1deg)] drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]">
                  {/* Laptop Screen / Display Lid */}
                  <div className="w-full bg-zinc-950 p-2 sm:p-2.5 rounded-t-xl sm:rounded-t-2xl border border-zinc-700/80 shadow-2xl">
                    {/* Camera Notch */}
                    <div className="w-10 h-2 bg-black mx-auto rounded-b-sm mb-1" />

                    {/* Tampilan Website di Layar Laptop */}
                    <div className="bg-white rounded-md overflow-hidden text-zinc-900 shadow-inner">
                      {/* Mini Navbar */}
                      <div className="px-3 py-1.5 border-b border-zinc-100 flex items-center justify-between text-[8px] text-zinc-600 bg-zinc-50">
                        <span className="font-bold text-zinc-950">Journal X</span>
                        <div className="flex gap-2 text-[7px] text-zinc-400">
                          <span>Home</span>
                          <span>About</span>
                          <span>Articles</span>
                        </div>
                      </div> 
                      <div
                        className="h-24 sm:h-28 bg-cover bg-center p-2.5 flex flex-col justify-end text-white relative"
                        style={{
                          backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=500&q=80')`,
                        }}
                      >
                        <span className="text-[7px] bg-white/30 backdrop-blur-sm px-1.5 py-0.5 rounded-full w-fit">
                          Travel
                        </span>
                        <p className="text-[9px] sm:text-[10px] font-bold leading-tight mt-1 line-clamp-1">
                          Unveiling hidden gems: Exploring off-the-beaten-path
                        </p>
                      </div>

                      <div className="p-2.5 space-y-2 bg-white">
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded-full bg-zinc-200 overflow-hidden flex-shrink-0">
                            <img
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                              alt="Author"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-[8px] font-bold text-zinc-900 leading-none">
                              Sophie Moore
                            </p>
                            <p className="text-[6px] text-zinc-400">Sep 1, 2023</p>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="h-1 bg-zinc-100 rounded-full w-full" />
                          <div className="h-1 bg-zinc-100 rounded-full w-5/6" />
                          <div className="h-1 bg-zinc-100 rounded-full w-3/4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[104%] -ml-[2%] h-2.5 sm:h-3.5 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 rounded-b-lg sm:rounded-b-xl border-t border-zinc-600 shadow-xl" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </main>
  );
}
