"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { PortableText } from "next-sanity";
import type { UseBlogDetailReturn } from "@/hooks/useBlogDetail";

export type BlogDetailPageProps = Partial<UseBlogDetailReturn>;

export default function BlogDetailPage(props: BlogDetailPageProps) {
  const {
    post,
    recentArticles = [],
    isLoading = false,
    isError = false,
    loadingMessage = "",
    refetch,
    handleResetLoading,
  } = props;

  return (
    <main className="min-h-screen bg-[#f8f8fa] text-zinc-900">
      <Navbar theme="light" />

      <Section
        id="blog-detail"
        className="pt-28 md:pt-36 pb-16 px-4 sm:px-8 md:px-12 max-w-6xl mx-auto flex flex-col justify-start"
      >
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-500 hover:text-blue-600 transition-colors"
          >
            <span>&larr;</span> Kembali ke Blog
          </Link>
        </div>

        {isError && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <span>
              <strong>Pemberitahuan:</strong>{" "}
              {loadingMessage || "Gagal memuat artikel dari Sanity."}
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

        {isLoading ? (
          <div className="space-y-6 animate-pulse">
            <div className="w-24 h-6 bg-zinc-200 rounded-full" />
            <div className="w-3/4 h-10 bg-zinc-200 rounded-xl" />
            <div className="w-40 h-4 bg-zinc-200 rounded-md" />
            <div className="w-full h-80 sm:h-[460px] bg-zinc-200 rounded-3xl" />
            <div className="space-y-3 pt-6">
              <div className="w-full h-4 bg-zinc-200 rounded-md" />
              <div className="w-full h-4 bg-zinc-200 rounded-md" />
              <div className="w-2/3 h-4 bg-zinc-200 rounded-md" />
            </div>
          </div>
        ) : !post ? (
          <div className="p-16 text-center bg-white rounded-3xl border border-zinc-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900">
              Artikel Tidak Ditemukan
            </h2>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">
              Artikel yang Anda cari tidak tersedia atau mungkin telah dihapus.
            </p>
            <div className="pt-2">
              <Link
                href="/blog"
                className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-xl transition-colors shadow-sm"
              >
                Lihat Semua Artikel
              </Link>
            </div>
          </div>
        ) : (
          <article className="space-y-8">
            <div className="space-y-4 max-w-4xl">
              <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                {post.category}
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#222144] tracking-tight leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-3 text-xs text-zinc-400">
                <span>{post.publishedAt}</span>
              </div>
            </div>

            <Card
              radius="3xl"
              border
              bgColor="bg-white"
              className="p-0 overflow-hidden shadow-lg border-zinc-200/80"
            >
              <div className="relative w-full aspect-[16/9] max-h-[520px] bg-zinc-100 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
              <div className="lg:col-span-8 space-y-6">
                {post.excerpt && (
                  <p className="text-base sm:text-lg text-zinc-600 font-medium leading-relaxed pb-4 border-b border-zinc-200">
                    {post.excerpt}
                  </p>
                )}

                <div className="prose prose-zinc max-w-none text-zinc-800 leading-relaxed text-sm sm:text-base space-y-4">
                  {post.content && post.content.length > 0 ? (
                    <PortableText value={post.content} />
                  ) : (
                    <p className="text-zinc-500 italic">
                      Konten artikel belum memiliki isi teks.
                    </p>
                  )}
                </div>
              </div>

              <aside className="lg:col-span-4 space-y-8">
                {recentArticles.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                        Artikel Lainnya
                      </h3>
                      <div className="h-px flex-1 bg-zinc-200" />
                    </div>

                    <div className="space-y-4">
                      {recentArticles.map((item) => (
                        <BlogCard
                          key={item.id}
                          title={item.title}
                          category={item.category}
                          excerpt={item.excerpt}
                          coverImage={item.coverImage}
                          publishedAt={item.publishedAt}
                          slug={`/blog/${item.slug}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </article>
        )}
      </Section>

      <Footer />
    </main>
  );
}
