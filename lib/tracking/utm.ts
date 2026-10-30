import { UtmParams } from "@/types/utm.type";

const UTM_STORAGE_KEY = "kodeva_utm_v1";

export function getStoredUtm(): UtmParams | null {
  if (typeof window === "undefined") return null;
  try {
    const sessionData = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (sessionData) {
      return JSON.parse(sessionData);
    }
    const localData = window.localStorage.getItem(UTM_STORAGE_KEY);
    if (localData) {
      return JSON.parse(localData);
    }
  } catch {
    return null;
  }
  return null;
}

export function captureUtmFromUrl(): UtmParams | null {
  if (typeof window === "undefined") return null;

  try {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source");
    const medium = params.get("utm_medium");
    const campaign = params.get("utm_campaign");
    const term = params.get("utm_term");
    const content = params.get("utm_content");

    if (source || medium || campaign || term || content) {
      const utmData: UtmParams = {
        utm_source: source || undefined,
        utm_medium: medium || undefined,
        utm_campaign: campaign || undefined,
        utm_term: term || undefined,
        utm_content: content || undefined,
        captured_at: new Date().toISOString(),
        landing_url: window.location.pathname + window.location.search,
      };

      try {
        window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData));
        window.localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData));
      } catch {}

      return utmData;
    }
  } catch {
    return getStoredUtm();
  }

  return getStoredUtm();
}

export function formatUtmSummary(utm?: UtmParams | null): string {
  if (!utm || !utm.utm_source) return "";
  const parts = [utm.utm_source];
  if (utm.utm_campaign) parts.push(`kampanye: ${utm.utm_campaign}`);
  if (utm.utm_medium) parts.push(`media: ${utm.utm_medium}`);
  return parts.join(" | ");
}
