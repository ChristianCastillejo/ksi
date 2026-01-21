"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { Globe } from "lucide-react";
import { CONFIG } from "./config";

export interface HeroDigitalSanghaContent {
    tagline: string;
    titleMain: string;
    titleItalic: string;
    description: string;
}

interface HeroDigitalSanghaProps {
    scrollYProgress: MotionValue<number>;
    content: HeroDigitalSanghaContent;
}

export const HeroDigitalSangha = ({ scrollYProgress, content }: HeroDigitalSanghaProps) => {
    const yText = useTransform(scrollYProgress, [0, 1], CONFIG.PARALLAX.HERO_TEXT);

    return (
        <section className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden bg-background pt-32 pb-20 px-6 lg:px-16 border-b border-border/50">
            <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
                <motion.div style={{ y: yText }} className="flex flex-col items-center">

                    <motion.div
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL, ease: "easeOut" }}
                        className="w-[1px] h-24 bg-accent/40 mb-12 origin-top"
                    />

                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: CONFIG.ANIMATION.DURATION.FAST, delay: CONFIG.ANIMATION.DELAY.SHORT }}
                        className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-8 block flex items-center gap-3"
                    >
                        <Globe size={14} /> {content.tagline}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL, delay: CONFIG.ANIMATION.DELAY.NORMAL, ease: CONFIG.ANIMATION.EASE }}
                        className="font-serif text-6xl md:text-8xl lg:text-[110px] text-foreground leading-[0.9] tracking-tight"
                    >
                        {content.titleMain} <br />
                        <span className="italic text-foreground/70">{content.titleItalic}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL, delay: CONFIG.ANIMATION.DELAY.LONG }}
                        className="mt-12 text-foreground/60 font-sans text-base md:text-lg max-w-2xl leading-relaxed"
                    >
                        {content.description}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};
