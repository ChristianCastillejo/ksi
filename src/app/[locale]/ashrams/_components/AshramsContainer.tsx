"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import { HeroAshrams, HeroAshramsContent } from "./HeroAshrams";

interface AshramsContainerProps {
    children: React.ReactNode;
    heroContent: HeroAshramsContent;
}

export const AshramsContainer = ({ children, heroContent }: AshramsContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="relative w-full bg-background">
            <HeroAshrams scrollYProgress={scrollYProgress} content={heroContent} />
            {children}
        </div>
    );
};
