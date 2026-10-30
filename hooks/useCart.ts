import { useState, useEffect, useMemo } from "react";
import { CartItem, CartTotals } from "@/types/cart.type";
import { ProductItem, TierOption } from "@/types/product.type";

const CART_STORAGE_KEY = "kodeva_cart_v1";

export default function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [quotaWarning, setQuotaWarning] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
          setItems(JSON.parse(stored));
        }
      } catch {
        setItems([]);
      } finally {
        setIsInitialized(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, isInitialized]);

  const totals: CartTotals = useMemo(() => {
    let totalQuantity = 0;
    let subtotal = 0;
    let totalOriginal = 0;

    for (const item of items) {
      totalQuantity += item.quantity;
      subtotal += item.price * item.quantity;
      const orig = item.originalPrice && item.originalPrice > item.price ? item.originalPrice : item.price;
      totalOriginal += orig * item.quantity;
    }

    const totalDiscount = Math.max(0, totalOriginal - subtotal);
    const grandTotal = subtotal;

    return {
      totalQuantity,
      subtotal,
      totalDiscount,
      grandTotal,
    };
  }, [items]);

  const handleGetTotalQuantityForProduct = (productId: string, excludeItemId?: string): number => {
    return items
      .filter((i) => i.productId === productId && i.id !== excludeItemId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  const handleAddToCart = (
    product: ProductItem,
    selectedTier: TierOption,
    quantityToAdd = 1
  ): { success: boolean; message?: string } => {
    setQuotaWarning(null);

    const maxQuota = product.promoQuota ?? 10;
    const currentTotalForProduct = handleGetTotalQuantityForProduct(product.id);
    const requestedTotal = currentTotalForProduct + quantityToAdd;

    if (requestedTotal > maxQuota) {
      const available = Math.max(0, maxQuota - currentTotalForProduct);
      const msg = `Batas kuota promo untuk "${product.title}" tersisa ${available} lisensi. Total lisensi seluruh paket produk ini di keranjang Anda sudah mencapai ${currentTotalForProduct}.`;
      setQuotaWarning(msg);
      return { success: false, message: msg };
    }

    const existingIndex = items.findIndex(
      (i) => i.productId === product.id && i.tier === selectedTier.tier
    );

    if (existingIndex > -1) {
      setItems((prev) => {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantityToAdd,
        };
        return next;
      });
    } else {
      const newItem: CartItem = {
        id: `${product.id}_${selectedTier.tier}`,
        productId: product.id,
        title: product.title,
        slug: product.slug,
        coverImage: product.coverImage,
        tier: selectedTier.tier,
        tierName: selectedTier.name,
        price: selectedTier.price,
        originalPrice: selectedTier.originalPrice,
        quantity: quantityToAdd,
        promoQuota: maxQuota,
      };

      setItems((prev) => [...prev, newItem]);
    }

    return { success: true };
  };

  const handleUpdateQuantity = (
    itemId: string,
    newQuantity: number
  ): { success: boolean; message?: string } => {
    setQuotaWarning(null);

    const targetItem = items.find((i) => i.id === itemId);
    if (!targetItem) return { success: false, message: "Item tidak ditemukan" };

    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return { success: true };
    }

    const otherItemsCount = handleGetTotalQuantityForProduct(targetItem.productId, itemId);
    const newTotalForProduct = otherItemsCount + newQuantity;

    if (newTotalForProduct > targetItem.promoQuota) {
      const maxAllowed = Math.max(0, targetItem.promoQuota - otherItemsCount);
      const msg = `Maksimal kuota promo gabungan untuk "${targetItem.title}" adalah ${targetItem.promoQuota} lisensi. Anda hanya dapat menambah hingga ${maxAllowed} lisensi untuk item ini.`;
      setQuotaWarning(msg);
      return { success: false, message: msg };
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );

    return { success: true };
  };

  const handleRemoveItem = (itemId: string) => {
    setQuotaWarning(null);
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setQuotaWarning(null);
    setItems([]);
  };

  const handleDismissWarning = () => {
    setQuotaWarning(null);
  };

  return {
    items,
    totals,
    isInitialized,
    quotaWarning,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClearCart,
    handleDismissWarning,
    handleGetTotalQuantityForProduct,
  };
}

export type UseCartReturn = ReturnType<typeof useCart>;
