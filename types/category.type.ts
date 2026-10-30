import { SanityDocument, SanitySlug } from "@/types/sanity.type";

export interface CategoryProps extends SanityDocument {
  title: string;
  slug: SanitySlug;
  description?: string;
}

export interface BlogCategoryItem {
  id?: string;
  name: string;
  slug?: string;
  desc: string;
  image: string;
}

