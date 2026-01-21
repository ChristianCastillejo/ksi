"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import { HeroFAQ, HeroFAQContent } from "./HeroFAQ";

interface FaqContainerProps {
    heroContent: HeroFAQContent;
    children: React.ReactNode;
}

export const FaqContainer = ({ heroContent, children }: FaqContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="relative w-full bg-background selection:bg-accent/20 selection:text-accent pb-32">
            <HeroFAQ scrollYProgress={scrollYProgress} content={heroContent} />
            {children}
        </div>
    );
};
