"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

type NavbarContextValue = {
  isScrolled: boolean;
};

const NavbarContext = React.createContext<NavbarContextValue | null>(null);

export function useNavbar() {
  const context = React.useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a <Navbar />");
  }
  return context;
}

type MotionHeaderProps = React.ComponentPropsWithoutRef<typeof motion.header>;
type MotionHeaderRef = React.ElementRef<typeof motion.header>;

const Navbar = React.forwardRef<MotionHeaderRef, MotionHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
      const scrolled = latest > 50;
      if (isScrolled !== scrolled) setIsScrolled(scrolled);
    });

    return (
      <NavbarContext.Provider value={{ isScrolled }}>
        <motion.header
          ref={ref}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out",
            isScrolled
              ? "bg-background/90 backdrop-blur-md border-b border-border/50 py-3 shadow-sm"
              : "bg-white/90 py-6",
            className
          )}
          {...props}
        >
          {children}
        </motion.header>
      </NavbarContext.Provider>
    );
  }
);
Navbar.displayName = "Navbar";

const NavbarContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative max-w-[1400px] mx-auto px-6 lg:px-16 w-full flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  )
);
NavbarContainer.displayName = "NavbarContainer";

const NavbarBrand = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-3 lg:gap-4 z-10", className)} {...props} />
  )
);
NavbarBrand.displayName = "NavbarBrand";

const NavbarContent = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} className={cn("hidden lg:flex absolute left-1/2 -translate-x-1/2 h-full items-center justify-center z-10", className)} {...props} />
  )
);
NavbarContent.displayName = "NavbarContent";

const NavbarAction = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex justify-end items-center gap-4 lg:gap-6 z-10", className)} {...props} />
  )
);
NavbarAction.displayName = "NavbarAction";

export {
  Navbar,
  NavbarContainer,
  NavbarBrand,
  NavbarContent,
  NavbarAction,
};