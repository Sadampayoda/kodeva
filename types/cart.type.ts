import { ProductTier } from "@/enums/tier.enum";

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  slug: string;
  coverImage: string;
  tier: ProductTier;
  tierName: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  promoQuota: number;
}

export interface CartTotals {
  totalQuantity: number;
  subtotal: number;
  totalDiscount: number;
  grandTotal: number;
}
