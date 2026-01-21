"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import { HeroDigitalSangha, HeroDigitalSanghaContent } from "./HeroDigitalSangha";

interface CommunityContainerProps {
    children: React.ReactNode;
    heroContent: HeroDigitalSanghaContent;
}

export const CommunityContainer = ({ children, heroContent }: CommunityContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="relative w-full bg-background selection:bg-accent/20 selection:text-accent pb-32">
            <HeroDigitalSangha scrollYProgress={scrollYProgress} content={heroContent} />
            {children}
        </div>
    );
};
