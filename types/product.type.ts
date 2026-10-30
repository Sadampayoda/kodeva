import { SanityDocument, SanitySlug } from "@/types/sanity.type";

export interface ProductItem extends SanityDocument {
  id: string;
  title: string;
  slug: string;
  price: number;
  originalPrice?: number;
  excerpt: string;
  coverImage: string;
  badge?: string;
  isFeatured: boolean;
  rating?: number;
  category?: string;
  demoUrl?: string;
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
}
