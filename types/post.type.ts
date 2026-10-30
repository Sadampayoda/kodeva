import {
  SanityDocument,
  SanitySlug,
  SanityImage,
  SanityReference,
  SanityBlock,
} from "@/types/sanity.type";
import { CategoryProps } from "@/types/category.type";

export interface PostProps extends SanityDocument {
  title: string;
  slug: SanitySlug;
  coverImage: SanityImage;
  excerpt: string;
  content: SanityBlock[];
  category: Array<SanityReference & Partial<CategoryProps>>;
  publishedAt: string;
  relatedProducts?: string[];
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: SanityImage;
}

export interface BlogArticleItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage: string;
  publishedAt: string;
}

export interface BlogDetailItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage: string;
  publishedAt: string;
  content: SanityBlock[];
  relatedProducts?: string[];
}

export interface MostViewedItem {
  id: string;
  title: string;
  timeAgo: string;
  image: string;
  slug?: string;
}
