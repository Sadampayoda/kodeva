import React, { forwardRef } from "react";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  fixedHeight?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className = "", fixedHeight = false, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={`w-full ${fixedHeight ? "h-screen" : "min-h-screen"} ${className}`.trim()}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;

