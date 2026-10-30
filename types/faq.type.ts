import { SanityDocument } from "@/types/sanity.type";

export interface FaqItem extends SanityDocument {
  id: string;
  question: string;
  answer: string;
  order?: number;
}

export interface SanityFaqResponse extends SanityDocument {
  question: string;
  answer: string;
  order?: number;
}

