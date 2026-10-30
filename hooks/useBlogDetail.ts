import { useState, useEffect, useCallback } from "react";
import Query from "@/lib/sanity/query";
import useLoading from "@/hooks/useLoading";
import { BlogArticleItem, BlogDetailItem } from "@/types/post.type";
import type { SanityBlock } from "@/types/sanity.type";

function formatPublishedDate(dateString?: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

interface SanityPostDetailResponse {
  _id: string;
  title: string;
  slug?: { current: string };
  excerpt?: string;
  coverImage?: string;
  publishedAt?: string;
  categories?: Array<{
    _id: string;
    title: string;
    slug?: { current: string };
  }>;
  content?: SanityBlock[];
  relatedProducts?: string[];
}

export default function useBlogDetail(slug?: string) {
  const [post, setPost] = useState<BlogDetailItem | null>(null);
  const [recentArticles, setRecentArticles] = useState<BlogArticleItem[]>([]);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const { loading, setLoading, handleResetLoading } = useLoading({
    show: true,
    message: "Memuat artikel...",
    type: "loading",
  });

  const refetch = useCallback(() => {
    setLoading({ show: true, message: "Memuat ulang artikel...", type: "loading" });
    setRefreshIndex((prev) => prev + 1);
  }, [setLoading]);

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;

    async function fetchPostDetail() {
      try {
        const detailQuery = new Query({ table: "post", limit: 1 })
          .where({ column: "slug.current", value: slug! })
          .select([
            "_id",
            "title",
            "slug",
            "excerpt",
            '"coverImage": coverImage.asset->url',
            "publishedAt",
            '"categories": category[]->{_id, title, slug}',
            "content",
            "relatedProducts",
          ]);

        const recentQuery = new Query({ table: "post", limit: 4 })
          .orderBy({ field: "publishedAt", direction: "desc" })
          .select([
            "_id",
            "title",
            "slug",
            "excerpt",
            '"coverImage": coverImage.asset->url',
            "publishedAt",
            '"categories": category[]->{_id, title, slug}',
          ]);

        const [postResult, recentResult] = await Promise.all([
          detailQuery.execute<SanityPostDetailResponse[]>(),
          recentQuery.execute<SanityPostDetailResponse[]>(),
        ]);

        if (!isMounted) return;

        if (Array.isArray(postResult) && postResult.length > 0) {
          const raw = postResult[0];
          const categoryName = raw.categories?.[0]?.title || "Umum";

          setPost({
            id: raw._id,
            title: raw.title || "Untitled Article",
            slug: raw.slug?.current || raw._id,
            excerpt: raw.excerpt || "",
            category: categoryName,
            coverImage:
              raw.coverImage ||
              "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
            publishedAt: formatPublishedDate(raw.publishedAt),
            content: raw.content || [],
            relatedProducts: raw.relatedProducts || [],
          });
        } else {
          setPost(null);
        }

        if (Array.isArray(recentResult)) {
          const mappedRecent: BlogArticleItem[] = recentResult
            .filter((item) => item.slug?.current !== slug)
            .slice(0, 3)
            .map((item) => ({
              id: item._id,
              title: item.title,
              slug: item.slug?.current || item._id,
              excerpt: item.excerpt || "",
              category: item.categories?.[0]?.title || "Umum",
              coverImage:
                item.coverImage ||
                "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
              publishedAt: formatPublishedDate(item.publishedAt),
            }));

          setRecentArticles(mappedRecent);
        }

        handleResetLoading();
      } catch (err: unknown) {
        if (!isMounted) return;
        const errMsg =
          err instanceof Error ? err.message : "Gagal memuat artikel";
        console.error("Error useBlogDetail:", errMsg);
        setLoading({ show: true, message: errMsg, type: "error" });
      }
    }

    fetchPostDetail();

    return () => {
      isMounted = false;
    };
  }, [slug, refreshIndex, handleResetLoading, setLoading]);

  const isLoading = Boolean(loading?.show && loading?.type === "loading");
  const isError = Boolean(loading?.show && loading?.type === "error");
  const loadingMessage = loading?.message || "";

  return {
    post,
    recentArticles,
    loading,
    isLoading,
    isError,
    loadingMessage,
    refetch,
    handleResetLoading,
  };
}

export type UseBlogDetailReturn = ReturnType<typeof useBlogDetail>;
