import React, { forwardRef } from "react";

export type CardRadius = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  /**
   * Border styling.
   * - boolean (true): menambahkan border halus bawaan ('border border-zinc-200')
   * - string: custom border class (misal 'border-2 border-zinc-900')
   */
  border?: boolean | string;
  /**
   * Sudut kelengkungan (border-radius).
   * Pilihan: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
   * Default: "2xl"
   */
  radius?: CardRadius;
  /**
   * URL atau path gambar untuk background (misal: '/image.jpg' atau 'https://...').
   */
  bgImage?: string;
  /**
   * Background color. Bisa berupa class Tailwind ('bg-white', 'bg-zinc-900')
   * atau nilai warna langsung ('#ffffff', 'rgb(240, 240, 240)').
   */
  bgColor?: string;
  /**
   * Lapisan gelap/gradien di atas gambar agar teks selalu terbaca kontras.
   * - true (default jika bgImage ada): gradien hitam transparan standar
   * - string: custom gradient atau warna overlay (misal: 'rgba(0,0,0,0.4)')
   * - false: tanpa overlay
   */
  overlay?: boolean | string;
}

const radiusClasses: Record<CardRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className = "",
      border = false,
      radius = "2xl",
      bgImage,
      bgColor = "bg-white",
      overlay,
      style,
      ...props
    },
    ref
  ) => {
    // 1. Tentukan class border
    let borderClass = "";
    if (typeof border === "string") {
      borderClass = border;
    } else if (border === true) {
      borderClass = "border border-zinc-200/80";
    }

    // 2. Tentukan radius
    const radiusClass = radiusClasses[radius] || radiusClasses["2xl"];

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

    return (
      <div
        ref={ref}
        style={customStyle}
        className={`relative overflow-hidden transition-all ${radiusClass} ${borderClass} ${bgClass} ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;

