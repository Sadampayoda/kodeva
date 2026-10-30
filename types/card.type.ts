import { CardRadius } from "@/enums/card.enum";
import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  border?: boolean | string;
  radius?: CardRadius;
  bgImage?: string;
  bgColor?: string;
  overlay?: boolean | string;
}
