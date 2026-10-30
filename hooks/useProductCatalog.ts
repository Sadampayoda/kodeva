import { useState, useEffect, useMemo } from "react";
import useLoading from "@/hooks/useLoading";
import { ProductItem } from "@/types/product.type";

const categories = [
  "Semua",
  "Kasir POS",
  "SaaS Starter",
  "Manajemen SDM",
  "E-Commerce",
  "Edu-Tech",
  "Properti",
];

export default function useProductCatalog() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [refreshIndex, setRefreshIndex] = useState<number>(0);

  const { loading, setLoading, handleResetLoading } = useLoading({
    show: true,
    message: "Memuat katalog produk...",
    type: "loading",
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();

        if (!isMounted) return;

        if (json.success && Array.isArray(json.data)) {
          setProducts(json.data);
          handleResetLoading();
        } else {
          setLoading({ show: true, message: "Katalog produk kosong", type: "idle" });
        }
      } catch (err) {
        if (!isMounted) return;
        const msg = err instanceof Error ? err.message : "Gagal memuat produk dari server";
        setLoading({ show: true, message: msg, type: "error" });
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [refreshIndex, handleResetLoading, setLoading]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== "Semua") {
      list = list.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sort: "featured" | "price-asc" | "price-desc") => {
    setSortBy(sort);
  };

  const handleRefetch = () => {
    setLoading({ show: true, message: "Memuat ulang...", type: "loading" });
    setRefreshIndex((prev) => prev + 1);
  };

  const isLoading = Boolean(loading?.show && loading?.type === "loading");
  const isError = Boolean(loading?.show && loading?.type === "error");
  const loadingMessage = loading?.message || "";

  return {
    products: filteredProducts,
    allCategories: categories,
    selectedCategory,
    searchQuery,
    sortBy,
    isLoading,
    isError,
    loadingMessage,
    handleSelectCategory,
    handleSearchChange,
    handleSortChange,
    handleRefetch,
  };
}

export type UseProductCatalogReturn = ReturnType<typeof useProductCatalog>;
