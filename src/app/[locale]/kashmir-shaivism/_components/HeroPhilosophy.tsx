"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { CONFIG } from "./config";

export interface HeroPhilosophyContent {
    tagline: string;
    titleMain: string;
    titleItalic: string;
    description: string;
}

export interface HeroPhilosophyProps {
    scrollYProgress: MotionValue<number>;
    content: HeroPhilosophyContent;
}

export const HeroPhilosophy = ({ scrollYProgress, content }: HeroPhilosophyProps) => {
    const yText = useTransform(scrollYProgress, [0, 1], CONFIG.PARALLAX.HERO_TEXT);

    return (
        <section className="relative min-h-[100vh] bg-secondary w-full flex items-center justify-center overflow-hidden bg-background pt-32 pb-20 px-6 lg:px-16 border-b border-border/50">
            <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
                <motion.div style={{ y: yText }} className="flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL, ease: "easeOut" }}
                        className="w-[1px] h-24 bg-background/30 mb-12 origin-top"
                    />

                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: CONFIG.ANIMATION.DURATION.FAST, delay: CONFIG.ANIMATION.DELAY.SHORT }}
                        className="text-[10px] md:text-[12px] font-sans uppercase tracking-[0.3em] text-background/60 mb-8 block"
                    >
                        {content.tagline}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL, delay: CONFIG.ANIMATION.DELAY.NORMAL, ease: CONFIG.ANIMATION.EASE }}
                        className="font-serif text-6xl md:text-8xl lg:text-[110px] text-background font-medium tracking-tight leading-[0.9]"
                    >
                        {content.titleMain} <br />
                        <span className="italic text-background/80 ml-8 lg:ml-24">{content.titleItalic}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL, delay: CONFIG.ANIMATION.DELAY.LONG }}
                        className="mt-16 text-background/50 font-sans text-base md:text-lg max-w-2xl leading-relaxed"
                    >
                        {content.description}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};
