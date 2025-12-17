import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const Footer = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn("relative z-10 w-full bg-secondary text-secondary-foreground pt-24 pb-12", className)}
      {...props}
    />
  ),
);
Footer.displayName = "Footer";

const FooterContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("max-w-7xl mx-auto px-6 lg:px-16 w-full", className)}
      {...props}
    >
      {children}
    </div>
  ),
);
FooterContainer.displayName = "FooterContainer";

const FooterTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("font-serif text-3xl md:text-4xl text-white font-medium tracking-tight mb-6", className)}
      {...props}
    />
  )
);
FooterTitle.displayName = "FooterTitle";

const FooterDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm font-sans text-white/60 leading-relaxed max-w-sm", className)}
      {...props}
    />
  )
);
FooterDescription.displayName = "FooterDescription";

const FooterGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8", className)}
      {...props}
    />
  )
);
FooterGrid.displayName = "FooterGrid";

const FooterLabel = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("block font-sans text-[10px] font-bold uppercase tracking-widest text-accent mb-6", className)}
      {...props}
    />
  )
);
FooterLabel.displayName = "FooterLabel";

interface FooterLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
}

const FooterLink = React.forwardRef<HTMLAnchorElement, FooterLinkProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex font-sans text-sm text-white/70 hover:text-white transition-colors duration-300 py-1.5",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
FooterLink.displayName = "FooterLink";

const FooterBottom = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6",
        className
      )}
      {...props}
    />
  )
);
FooterBottom.displayName = "FooterBottom";

export {
  Footer,
  FooterContainer,
  FooterTitle,
  FooterDescription,
  FooterLink,
  FooterLabel,
  FooterGrid,
  FooterBottom,
};