import { SanityDocument } from "@/types/sanity.type";

export interface TestimonialItem extends SanityDocument {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface SanityTestimonialResponse extends SanityDocument {
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  content: string;
  rating?: number;
}

