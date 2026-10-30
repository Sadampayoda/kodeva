export interface Ga4Item {
  item_id: string;
  item_name: string;
  item_category?: string;
  item_variant?: string;
  price: number;
  quantity?: number;
}

export interface Ga4EcommercePayload {
  currency: string;
  value?: number;
  items: Ga4Item[];
}

export interface Ga4EventPayload {
  event: string;
  ecommerce?: Ga4EcommercePayload;
  cta_name?: string;
  cta_location?: string;
  cta_target?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  [key: string]: unknown;
}
