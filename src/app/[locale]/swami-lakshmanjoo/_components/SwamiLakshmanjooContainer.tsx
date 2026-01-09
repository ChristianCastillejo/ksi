"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import { HeroSection } from "./HeroSection";

interface HeroContent {
    tagline: string;
    titleMain: string;
    titleItalic: string;
    description: string;
    imageAlt: string;
    archiveLabel: string;
}

interface SwamiLakshmanjooContainerProps {
    heroContent: HeroContent;
    children: React.ReactNode;
}

export const SwamiLakshmanjooContainer = ({ heroContent, children }: SwamiLakshmanjooContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="relative w-full bg-background selection:bg-accent/20 selection:text-accent">
            <HeroSection scrollYProgress={scrollYProgress} content={heroContent} />
            {children}
        </div>
    );
};
