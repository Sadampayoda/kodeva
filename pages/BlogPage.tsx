"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import type { UseBlogPageReturn } from "@/hooks/useBlogPage";

export type BlogPageProps = Partial<UseBlogPageReturn>;

export default function BlogPage(props: BlogPageProps) {
  const {
    currentPage = 1,
    setCurrentPage = () => {},
    paginatedArticles = [],
    totalPages = 1,
    featuredArticle = null,
    mostViewed = [],
    categoriesList = [],
    isLoading = false,
    isError = false,
    loadingMessage = "",
    handleResetLoading,
    refetch,
  } = props;

  return (
    <main className="min-h-screen bg-[#f8f8fa] text-zinc-900">
      <Navbar theme="light" />

      <Section
        id="blog-hero"
        className="pt-28 md:pt-36 pb-12 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col justify-start"
      >
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#222144] uppercase leading-[0.92]">
            Stories
            <br />
            Written For
            <br />
            Impact
          </h1>
        </div>

        {isLoading ? (
          <div className="w-full h-[380px] sm:h-[460px] md:h-[520px] rounded-3xl bg-zinc-200 animate-pulse p-8 flex flex-col justify-between" />
        ) : featuredArticle ? (
          <Card
            radius="3xl"
            bgImage={featuredArticle.coverImage}
            overlay="linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8))"
            className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] p-6 sm:p-10 md:p-12 flex flex-col justify-between text-white shadow-xl group cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <span className="inline-block text-[10px] font-bold tracking-wider uppercase bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                {featuredArticle.category}
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-3">
                <Link href={`/blog/${featuredArticle.slug}`}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight hover:underline">
                    {featuredArticle.title}
                  </h2>
                </Link>
                <p className="text-xs sm:text-sm text-white/80 line-clamp-2 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                <div className="pt-2 text-xs text-white/80">
                  <span>{featuredArticle.publishedAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="w-6 h-1.5 rounded-full bg-white" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
              </div>
            </div>
          </Card>
        ) : null}
      </Section>

      <Section
        id="articles-feed"
        className="py-8 md:py-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col justify-start"
      >
        {isError && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <span>
              <strong>Pemberitahuan:</strong>{" "}
              {loadingMessage || "Gagal menyinkronkan data Sanity."}
            </span>
            <div className="flex items-center gap-2">
              {refetch && (
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="px-3 py-1.5 bg-rose-200 hover:bg-rose-300 text-rose-900 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Coba Lagi
                </button>
              )}
              {handleResetLoading && (
                <button
                  type="button"
                  onClick={() => handleResetLoading()}
                  className="px-2.5 py-1.5 text-rose-600 hover:text-rose-800 font-medium text-xs transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8 space-y-6">
            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-52 rounded-2xl bg-white border border-zinc-200/70 p-6 flex flex-col sm:flex-row gap-6 animate-pulse"
                  >
                    <div className="w-full sm:w-5/12 h-36 bg-zinc-200 rounded-xl flex-shrink-0" />
                    <div className="w-full sm:w-7/12 space-y-3 py-2">
                      <div className="w-20 h-4 bg-zinc-200 rounded-full" />
                      <div className="w-3/4 h-6 bg-zinc-200 rounded-md" />
                      <div className="w-full h-4 bg-zinc-200 rounded-md" />
                      <div className="w-1/2 h-4 bg-zinc-200 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            ) : paginatedArticles.length === 0 ? (
              <div className="p-16 text-center bg-white rounded-2xl border border-zinc-200">
                <p className="text-zinc-500 font-medium">Belum ada artikel yang diterbitkan.</p>
              </div>
            ) : (
              <>
                {paginatedArticles.map((item) => (
                  <BlogCard
                    key={item.id}
                    title={item.title}
                    category={item.category}
                    excerpt={item.excerpt}
                    coverImage={item.coverImage}
                    publishedAt={item.publishedAt}
                    slug={`/blog/${item.slug || item.id}`}
                  />
                ))}

                {totalPages > 1 && (
                  <div className="pt-8 sm:pt-10 flex justify-center sm:justify-start">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                  Most Viewed
                </h3>
                <div className="h-px flex-1 bg-zinc-200" />
              </div>

              <div className="space-y-4">
                {mostViewed.length > 0 ? (
                  mostViewed.map((item) => (
                    <Link
                      key={item.id}
                      href={item.slug ? `/blog/${item.slug}` : "#"}
                      className="flex items-center gap-4 group p-2 -mx-2 rounded-xl hover:bg-white transition-all"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 rounded-xl object-cover flex-shrink-0 group-hover:opacity-90 transition-opacity"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-zinc-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mt-1">
                          {item.timeAgo}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-xs text-zinc-400">Belum ada artikel populer.</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                  Categories
                </h3>
                <div className="h-px flex-1 bg-zinc-200" />
              </div>

              <div className="space-y-3">
                {categoriesList.length > 0 ? (
                  categoriesList.map((cat) => (
                    <Card
                      key={cat.id || cat.name}
                      radius="xl"
                      border
                      bgColor="bg-white"
                      className="p-3 flex items-center gap-3.5 hover:border-zinc-400 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">
                          {cat.name}
                        </h4>
                        <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                          {cat.desc}
                        </p>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p className="text-xs text-zinc-400">Belum ada kategori yang terdaftar.</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
