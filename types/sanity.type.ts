import type { PortableTextBlock } from "sanity";

export interface SanityDocument {
  _id?: string;
  _type?: string;
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
}

export interface SanitySlug {
  current: string;
  _type?: "slug";
}

export interface SanityImage {
  _type?: "image";
  asset: {
    _ref: string;
    _type?: "reference";
    url?: string;
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanityReference {
  _key?: string;
  _ref: string;
  _type?: "reference";
}

export interface SanityClientProps {
  projectId: string;
  dataset: string;
  apiVersion: string;
  useCdn: boolean;
}

export type SanityBlock = PortableTextBlock;
