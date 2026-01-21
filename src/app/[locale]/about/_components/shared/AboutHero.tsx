"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CONFIG = {
    ANIMATION: {
        DURATION: { FAST: 0.8, NORMAL: 1.0 },
        DELAY: { SHORT: 0.2, NORMAL: 0.4 },
        EASE: [0.16, 1, 0.3, 1],
    }
} as const;

export interface AboutHeroContent {
    tag: string;
    title: string;
    italicTitle: string;
    description: string;
}

export const AboutHero = ({ content }: { content: AboutHeroContent }) => {
    const { scrollYProgress } = useScroll();
    const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);

    return (
        <section className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden bg-background pt-32 pb-16 px-6 lg:px-16 border-b border-border/50">
            <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
                <motion.div style={{ y: yText }} className="flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL, ease: "easeOut" }}
                        className="w-[1px] h-24 bg-accent/40 mb-10 origin-top"
                    />
                    <motion.span
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: CONFIG.ANIMATION.DURATION.FAST, delay: CONFIG.ANIMATION.DELAY.SHORT }}
                        className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-6 block"
                    >
                        {content.tag}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL, delay: CONFIG.ANIMATION.DELAY.NORMAL, ease: CONFIG.ANIMATION.EASE }}
                        className="font-serif text-5xl md:text-7xl lg:text-[100px] text-foreground leading-[0.9] tracking-tight mb-8"
                    >
                        {content.title} <br />
                        <span className="italic text-foreground/70">{content.italicTitle}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL, delay: 0.6 }}
                        className="text-foreground/60 font-sans text-base md:text-lg max-w-2xl leading-relaxed"
                    >
                        {content.description}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};