import React, { forwardRef } from "react";
import { CardProps } from "@/types/card.type";
import useCard from "@/hooks/useCard";

export type { CardProps } from "@/types/card.type";
export type { CardRadius } from "@/enums/card.enum";

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
    ref,
  ) => {
    const { customStyle, radiusClass, borderClass, bgClass } = useCard({
      border,
      radius,
      bgImage,
      bgColor,
      overlay,
      style,
    });

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
  },
);

Card.displayName = "Card";

export default Card;
