import { Ga4EventPayload, Ga4Item } from "@/types/tracking.type";
import { ProductItem, TierOption } from "@/types/product.type";
import { CartItem } from "@/types/cart.type";
import { getStoredUtm } from "@/lib/tracking/utm";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function pushToDataLayer(payload: Ga4EventPayload): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  try {
    window.dispatchEvent(
      new CustomEvent("ga4_datalayer_change", { detail: payload })
    );
  } catch {}

  if (process.env.NODE_ENV !== "production") {
    console.log("[GA4 dataLayer Event]", payload.event, payload);
  }
}

export function trackViewItem(product: ProductItem, tier?: TierOption): void {
  const utm = getStoredUtm();
  const price = tier ? tier.price : product.price;

  const item: Ga4Item = {
    item_id: product.id,
    item_name: product.title,
    item_category: product.category || "Aplikasi",
    item_variant: tier?.name || "Default",
    price,
    quantity: 1,
  };

  pushToDataLayer({
    event: "view_item",
    ecommerce: {
      currency: "IDR",
      value: price,
      items: [item],
    },
    utm_source: utm?.utm_source,
    utm_medium: utm?.utm_medium,
    utm_campaign: utm?.utm_campaign,
  });
}

export function trackAddToCart(
  productOrItem: ProductItem | CartItem,
  tier?: TierOption,
  quantity = 1
): void {
  const utm = getStoredUtm();

  const isCartItem = "productId" in productOrItem;
  const itemId = isCartItem ? productOrItem.productId : productOrItem.id;
  const itemName = productOrItem.title;
  const itemVariant = isCartItem ? productOrItem.tierName : tier?.name;
  const price = isCartItem ? productOrItem.price : tier ? tier.price : productOrItem.price;
  const totalValue = price * quantity;

  const item: Ga4Item = {
    item_id: itemId,
    item_name: itemName,
    item_variant: itemVariant,
    price,
    quantity,
  };

  pushToDataLayer({
    event: "add_to_cart",
    ecommerce: {
      currency: "IDR",
      value: totalValue,
      items: [item],
    },
    utm_source: utm?.utm_source,
    utm_medium: utm?.utm_medium,
    utm_campaign: utm?.utm_campaign,
  });
}

export function trackBeginCheckout(items: CartItem[], grandTotal: number): void {
  const utm = getStoredUtm();

  const gaItems: Ga4Item[] = items.map((item) => ({
    item_id: item.productId,
    item_name: item.title,
    item_variant: item.tierName,
    price: item.price,
    quantity: item.quantity,
  }));

  pushToDataLayer({
    event: "begin_checkout",
    ecommerce: {
      currency: "IDR",
      value: grandTotal,
      items: gaItems,
    },
    utm_source: utm?.utm_source,
    utm_medium: utm?.utm_medium,
    utm_campaign: utm?.utm_campaign,
  });
}

export function trackCtaClick(
  ctaName: string,
  ctaLocation: string,
  ctaTarget: string
): void {
  const utm = getStoredUtm();

  pushToDataLayer({
    event: "select_promotion",
    cta_name: ctaName,
    cta_location: ctaLocation,
    cta_target: ctaTarget,
    utm_source: utm?.utm_source,
    utm_medium: utm?.utm_medium,
    utm_campaign: utm?.utm_campaign,
  });
}
