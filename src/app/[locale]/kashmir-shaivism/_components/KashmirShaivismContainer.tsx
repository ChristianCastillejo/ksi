"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import { HeroPhilosophy, HeroPhilosophyContent } from "./HeroPhilosophy";

interface KashmirShaivismContainerProps {
    children: React.ReactNode;
    heroContent: HeroPhilosophyContent;
}

export const KashmirShaivismContainer = ({ children, heroContent }: KashmirShaivismContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="relative w-full bg-background selection:bg-accent/20 selection:text-accent">
            <HeroPhilosophy scrollYProgress={scrollYProgress} content={heroContent} />
            {children}
        </div>
    );
};
