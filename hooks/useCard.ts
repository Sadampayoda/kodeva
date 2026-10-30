import React from "react";
import { CardProps } from "@/types/card.type";
import { radiusClasses } from "@/enums/card.enum";

export interface UseCardParams {
  border?: boolean | string;
  radius?: CardProps["radius"];
  bgImage?: string;
  bgColor?: string;
  overlay?: boolean | string;
  style?: React.CSSProperties;
}

export default function useCard({
  border = false,
  radius = "2xl",
  bgImage,
  bgColor = "bg-white",
  overlay,
  style,
}: UseCardParams = {}) {
  // 1. Tentukan class border
  let borderClass = "";
  if (typeof border === "string") {
    borderClass = border;
  } else if (border === true) {
    borderClass = "border border-zinc-200/80";
  }

  // 2. Tentukan radius
  const radiusClass = radiusClasses[radius || "2xl"] || radiusClasses["2xl"];

  // 3. Tentukan background style & overlay
  const customStyle: React.CSSProperties = { ...style };
  let bgClass = "";

  if (bgImage) {
    bgClass = "bg-cover bg-center bg-no-repeat";

    const showOverlay = overlay !== false;
    let overlayValue =
      "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.65))";

    if (typeof overlay === "string") {
      overlayValue = overlay.includes("gradient")
        ? overlay
        : `linear-gradient(${overlay}, ${overlay})`;
    }

    if (showOverlay) {
      customStyle.backgroundImage = `${overlayValue}, url('${bgImage}')`;
    } else {
      customStyle.backgroundImage = `url('${bgImage}')`;
    }
  } else if (bgColor) {
    if (bgColor.startsWith("#") || bgColor.startsWith("rgb")) {
      customStyle.backgroundColor = bgColor;
    } else {
      bgClass = bgColor;
    }
  }

  return {
    customStyle,
    radiusClass,
    borderClass,
    bgClass,
  };
}
