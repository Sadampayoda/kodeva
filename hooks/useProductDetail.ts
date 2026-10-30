import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import useLoading from "@/hooks/useLoading";
import useCart from "@/hooks/useCart";
import { ProductItem, TierOption } from "@/types/product.type";
import { ProductTier } from "@/enums/tier.enum";

export default function useProductDetail(slug?: string) {
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [selectedTierKey, setSelectedTierKey] = useState<ProductTier>(ProductTier.BASIC);
  const [activeScreenshot, setActiveScreenshot] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [refreshIndex, setRefreshIndex] = useState<number>(0);

  const router = useRouter();
  const { handleAddToCart: addToCart, handleGetTotalQuantityForProduct } = useCart();
  const { loading, setLoading, handleResetLoading } = useLoading({
    show: true,
    message: "Memuat detail produk...",
    type: "loading",
  });

  useEffect(() => {
    if (!slug) return;
    let isMounted = true;

    async function fetchDetail() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        const json = await res.json();

        if (!isMounted) return;

        if (json.success && json.data) {
          setProduct(json.data);
          setActiveScreenshot(json.data.coverImage);
          if (json.data.tiers && json.data.tiers.length > 0) {
            setSelectedTierKey(json.data.tiers[0].tier);
          }
          handleResetLoading();
        } else {
          setProduct(null);
          setLoading({ show: true, message: "Produk tidak ditemukan", type: "idle" });
        }
      } catch (err) {
        if (!isMounted) return;
        const msg = err instanceof Error ? err.message : "Gagal memuat produk";
        setLoading({ show: true, message: msg, type: "error" });
      }
    }

    fetchDetail();

    return () => {
      isMounted = false;
    };
  }, [slug, refreshIndex, handleResetLoading, setLoading]);

  const selectedTier: TierOption | undefined = useMemo(() => {
    if (!product || !product.tiers) return undefined;
    return product.tiers.find((t) => t.tier === selectedTierKey) || product.tiers[0];
  }, [product, selectedTierKey]);

  const inCartCount = useMemo(() => {
    if (!product) return 0;
    return handleGetTotalQuantityForProduct(product.id);
  }, [product, handleGetTotalQuantityForProduct]);

  const remainingPromoQuota = useMemo(() => {
    if (!product) return 0;
    return Math.max(0, (product.promoQuota ?? 0) - inCartCount);
  }, [product, inCartCount]);

  const handleSelectTier = (tier: ProductTier) => {
    setSelectedTierKey(tier);
    setAddedSuccess(false);
    setActionError(null);
  };

  const handleSelectScreenshot = (src: string) => {
    setActiveScreenshot(src);
  };

  const handleQuantityChange = (newQty: number) => {
    if (newQty < 1) return;
    if (newQty > remainingPromoQuota) {
      setActionError(`Hanya tersisa ${remainingPromoQuota} lisensi promo yang dapat ditambahkan.`);
      return;
    }
    setActionError(null);
    setQuantity(newQty);
  };

  const handleAddToCart = () => {
    if (!product || !selectedTier) return;
    setActionError(null);

    const result = addToCart(product, selectedTier, quantity);
    if (!result.success) {
      setActionError(result.message || "Gagal menambahkan ke keranjang");
    } else {
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 4000);
    }
  };

  const handleBuyNow = () => {
    if (!product || !selectedTier) return;
    setActionError(null);

    const result = addToCart(product, selectedTier, quantity);
    if (!result.success) {
      setActionError(result.message || "Gagal memproses pembelian");
      return;
    }

    router.push("/cart");
  };

  const handleRefetch = () => {
    setLoading({ show: true, message: "Memuat ulang...", type: "loading" });
    setRefreshIndex((prev) => prev + 1);
  };

  const isLoading = Boolean(loading?.show && loading?.type === "loading");
  const isError = Boolean(loading?.show && loading?.type === "error");
  const loadingMessage = loading?.message || "";

  return {
    product,
    selectedTier,
    activeScreenshot,
    quantity,
    inCartCount,
    remainingPromoQuota,
    addedSuccess,
    actionError,
    isLoading,
    isError,
    loadingMessage,
    handleSelectTier,
    handleSelectScreenshot,
    handleQuantityChange,
    handleAddToCart,
    handleBuyNow,
    handleRefetch,
  };
}

export type UseProductDetailReturn = ReturnType<typeof useProductDetail>;
