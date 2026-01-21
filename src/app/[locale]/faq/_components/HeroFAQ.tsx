"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

export interface HeroFAQContent {
    tagline: string;
    titleMain: string;
    titleItalic: string;
    description: string;
}

interface HeroFAQProps {
    scrollYProgress: MotionValue<number>;
    content: HeroFAQContent;
}

export const HeroFAQ = ({ scrollYProgress, content }: HeroFAQProps) => {
    const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);

    return (
        <section className="relative min-h-[60vh] w-full pt-32 pb-16 bg-background flex flex-col justify-center items-center text-center px-6 border-b border-border/50 overflow-hidden">
            <motion.div style={{ y: yText }} className="flex flex-col items-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-6 block"
                >
                    {content.tagline}
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-serif text-5xl md:text-7xl text-foreground leading-[1.1] tracking-tight max-w-3xl"
                >
                    {content.titleMain} <br />
                    <span className="italic text-foreground/70">{content.titleItalic}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-8 text-foreground/60 font-sans text-base max-w-xl leading-relaxed"
                >
                    {content.description}
                </motion.p>
            </motion.div>
        </section>
    );
};
