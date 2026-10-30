import { useState, useEffect } from "react";
import { UtmParams } from "@/types/utm.type";
import { captureUtmFromUrl, getStoredUtm } from "@/lib/tracking/utm";

export default function useUtm() {
  const [utm, setUtm] = useState<UtmParams | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const captured = captureUtmFromUrl();
      if (captured) {
        setUtm(captured);
      } else {
        setUtm(getStoredUtm());
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleRefreshUtm = () => {
    const refreshed = getStoredUtm();
    setUtm(refreshed);
    return refreshed;
  };

  return {
    utm,
    handleRefreshUtm,
  };
}

export type UseUtmReturn = ReturnType<typeof useUtm>;
