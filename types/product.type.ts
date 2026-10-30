import { SanityDocument, SanitySlug } from "@/types/sanity.type";
import { ProductTier } from "@/enums/tier.enum";

export interface TierOption {
  tier: ProductTier;
  name: string;
  price: number;
  originalPrice: number;
  licenseCount: number;
  features: string[];
}

export interface ProductItem extends SanityDocument {
  id: string;
  title: string;
  slug: string;
  price: number;
  originalPrice?: number;
  excerpt: string;
  fullDescription?: string;
  coverImage: string;
  screenshots?: string[];
  badge?: string;
  isFeatured: boolean;
  rating?: number;
  category?: string;
  demoUrl?: string;
  promoQuota?: number;
  tiers?: TierOption[];
}

export interface SanityProductResponse extends SanityDocument {
  title: string;
  slug?: SanitySlug;
  price: number;
  originalPrice?: number;
  excerpt?: string;
  coverImage?: string;
  badge?: string;
  isFeatured?: boolean;
  rating?: number;
  category?: string;
  demoUrl?: string;
  promoQuota?: number;
}
