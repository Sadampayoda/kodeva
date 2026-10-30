import { ProductItem } from "@/types/product.type";
import { TestimonialItem } from "@/types/testimonial.type";
import { FaqItem } from "@/types/faq.type";
import { SanityDocument } from "@/types/sanity.type";

export interface LandingHeroData {
  badgeText: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
}

export interface SanityHeroResponse extends SanityDocument {
  badgeText?: string;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface LandingPageData {
  hero: LandingHeroData;
  featuredProducts: ProductItem[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
}

