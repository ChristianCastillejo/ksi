"use client";

import React, { use } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WorkshopCardFragmentFragment } from "@/gql/graphql";

const CONFIG = {
    ANIMATION: {
        DURATION: { FAST: 0.8, NORMAL: 1.0, SLOW: 1.5 },
        DELAY: { SHORT: 0.2, NORMAL: 0.4, LONG: 0.6 },
        EASE: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
    PARALLAX: {
        HERO_TEXT: [0, -80] as [number, number],
    }
} as const;

export interface HeroWorkshopContent {
    taglineUpcoming: string;
    taglineDefault: string;
    titleUpcomingLine1: string;
    titleUpcomingLine2Italic: string;
    titleDefaultLine1: string;
    titleDefaultLine2Italic: string;
    descUpcoming: string;
    descDefault: string;
}

interface HeroSectionProps {
    promise: Promise<WorkshopCardFragmentFragment | null>;
    content: HeroWorkshopContent;
}

export function HeroSection({ promise, content }: HeroSectionProps) {
    const program = use(promise);
    const isActive = !!program;

    const { scrollYProgress } = useScroll();
    const yText = useTransform(scrollYProgress, [0, 1], CONFIG.PARALLAX.HERO_TEXT);

    return (
        <section className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden bg-secondary pt-32 pb-20 px-6 lg:px-16 border-b border-border/10">
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
                        className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-8 block"
                    >
                        {isActive ? content.taglineUpcoming : content.taglineDefault}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL, delay: CONFIG.ANIMATION.DELAY.NORMAL, ease: CONFIG.ANIMATION.EASE }}
                        className="font-serif text-6xl md:text-8xl lg:text-[110px] text-background leading-[0.9] tracking-tight"
                    >
                        {isActive ? (
                            <>{content.titleUpcomingLine1} <br /><span className="italic text-background/70">{content.titleUpcomingLine2Italic}</span></>
                        ) : (
                            <>{content.titleDefaultLine1} <br /><span className="italic text-background/70">{content.titleDefaultLine2Italic}</span></>
                        )}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL, delay: CONFIG.ANIMATION.DELAY.LONG }}
                        className="mt-12 text-background/60 font-sans text-base md:text-lg max-w-2xl leading-relaxed"
                    >
                        {isActive ? content.descUpcoming : content.descDefault}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}