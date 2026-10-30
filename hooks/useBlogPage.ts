import { useState, useEffect, useCallback } from "react";
import Query from "@/lib/sanity/query";
import useLoading from "@/hooks/useLoading";
import { BlogArticleItem, MostViewedItem } from "@/types/post.type";
import { BlogCategoryItem } from "@/types/category.type";

const categoryThumbnails: Record<string, string> = {
  tech: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=150&q=80",
  photography: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=150&q=80",
  fashion: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=150&q=80",
  wellness: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=150&q=80",
  travel: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=150&q=80",
  saas: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=150&q=80",
  default: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=150&q=80",
};

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

interface SanityPostItem {
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
}

interface SanityCategoryItem {
  _id: string;
  title: string;
  slug?: { current: string };
  description?: string;
}

export default function useBlogPage() {
  const [articles, setArticles] = useState<BlogArticleItem[]>([]);
  const [categoriesList, setCategoriesList] = useState<BlogCategoryItem[]>([]);
  const [mostViewed, setMostViewed] = useState<MostViewedItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refreshIndex, setRefreshIndex] = useState<number>(0);

  const { loading, setLoading, handleResetLoading } = useLoading({
    show: true,
    message: "Memuat artikel...",
    type: "loading",
  });

  const itemsPerPage = 3;

  const refetch = useCallback(() => {
    setLoading({ show: true, message: "Memuat ulang artikel...", type: "loading" });
    setRefreshIndex((prev) => prev + 1);
  }, [setLoading]);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const postQuery = new Query({ table: "post" })
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

        const catQuery = new Query({ table: "category" })
          .orderBy({ field: "title", direction: "asc" })
          .select(["_id", "title", "slug", "description"]);

        const [postsData, categoriesData] = await Promise.all([
          postQuery.execute<SanityPostItem[]>(),
          catQuery.execute<SanityCategoryItem[]>(),
        ]);

        if (!isMounted) return;

        if (Array.isArray(postsData)) {
          const mappedArticles: BlogArticleItem[] = postsData.map((post) => {
            const categoryName = post.categories?.[0]?.title || "Umum";
            return {
              id: post._id,
              title: post.title || "Untitled Article",
              slug: post.slug?.current || post._id,
              excerpt: post.excerpt || "",
              category: categoryName,
              coverImage:
                post.coverImage ||
                "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
              publishedAt: formatPublishedDate(post.publishedAt),
            };
          });

          setArticles(mappedArticles);

          const generatedMostViewed: MostViewedItem[] = mappedArticles
            .slice(0, 5)
            .map((art) => ({
              id: art.id,
              title: art.title,
              timeAgo: art.publishedAt || "TERBARU",
              image: art.coverImage,
              slug: art.slug,
            }));
          setMostViewed(generatedMostViewed);
        }

        if (Array.isArray(categoriesData)) {
          const mappedCategories: BlogCategoryItem[] = categoriesData.map((cat) => {
            const slugKey = (cat.slug?.current || cat.title || "")
              .toLowerCase()
              .replace("website-", "");
            const thumbnail =
              categoryThumbnails[slugKey] ||
              categoryThumbnails[cat.title.toLowerCase()] ||
              categoryThumbnails.default;

            return {
              id: cat._id,
              name: cat.title,
              slug: cat.slug?.current || cat._id,
              desc:
                cat.description ||
                "Temukan berbagai wawasan dan pembaruan terkini.",
              image: thumbnail,
            };
          });

          setCategoriesList(mappedCategories);
        }

        handleResetLoading();
      } catch (err: unknown) {
        if (!isMounted) return;
        const errMsg =
          err instanceof Error ? err.message : "Gagal memuat data dari Sanity";
        console.error("Error useBlogPage:", errMsg);
        setLoading({ show: true, message: errMsg, type: "error" });
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [refreshIndex, handleResetLoading, setLoading]);

  const featuredArticle = articles.length > 0 ? articles[0] : null;

  const totalPages = Math.max(1, Math.ceil(articles.length / itemsPerPage));
  const paginatedArticles = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const isLoading = Boolean(loading?.show && loading?.type === "loading");
  const isError = Boolean(loading?.show && loading?.type === "error");
  const loadingMessage = loading?.message || "";

  return {
    currentPage,
    setCurrentPage,
    paginatedArticles,
    totalPages,
    itemsPerPage,
    articles,
    featuredArticle,
    mostViewed,
    categoriesList,
    loading,
    isLoading,
    isError,
    loadingMessage,
    setLoading,
    handleResetLoading,
    refetch,
  };
}

export type UseBlogPageReturn = ReturnType<typeof useBlogPage>;
