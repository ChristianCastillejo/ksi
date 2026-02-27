"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

const CONFIG = {
    ANIMATION: {
        DURATION: { FAST: 0.8, NORMAL: 1.2, SLOW: 1.5 },
        DELAY: { SHORT: 0.2, NORMAL: 0.4, LONG: 0.6 },
        EASE: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
    PARALLAX: { IMAGE: [0, 100] as [number, number], TEXT: [0, -60] as [number, number] }
};

export interface HomeHeroContent {
    tagline: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    buttons: {
        kashmirShaivism: string;
        swamiLakshmanjoo: string;
    };
}

export const HomeHero = ({ content }: { content: HomeHeroContent }) => {
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const yImage = useTransform(scrollYProgress, [0, 1], CONFIG.PARALLAX.IMAGE);
    const yText = useTransform(scrollYProgress, [0, 1], CONFIG.PARALLAX.TEXT);

    return (
        <section ref={heroRef} className="relative min-h-[100svh] w-full flex flex-col justify-center overflow-hidden bg-background pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                <motion.div style={{ y: yText }} className="lg:col-span-6 flex flex-col items-start text-left z-20">
                    <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL, ease: CONFIG.ANIMATION.EASE }} className="w-16 h-[1px] bg-accent mb-8 origin-left" />
                    <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: CONFIG.ANIMATION.DURATION.FAST, delay: CONFIG.ANIMATION.DELAY.SHORT }} className="font-sans text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-accent mb-6">
                        {content.tagline}
                    </motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: CONFIG.ANIMATION.DURATION.FAST, delay: CONFIG.ANIMATION.DELAY.NORMAL }} className="font-serif text-6xl md:text-8xl lg:text-[100px] xl:text-[110px] text-foreground leading-[0.95] tracking-tight mb-8">
                        {content.titleLine1} <br />
                        <span className="italic text-foreground/70">{content.titleLine2}</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: CONFIG.ANIMATION.DURATION.FAST, delay: CONFIG.ANIMATION.DELAY.NORMAL + 0.2 }} className="text-foreground/70 font-sans max-w-md leading-relaxed mb-10 text-sm md:text-base">
                        {content.description}
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL, delay: CONFIG.ANIMATION.DELAY.LONG }} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                        <Button asChild size="lg"><Link href="/kashmir-shaivism">{content.buttons.kashmirShaivism}</Link></Button>
                        <Button asChild variant="outline" size="lg"><Link href="/swami-lakshmanjoo">{content.buttons.swamiLakshmanjoo}</Link></Button>
                    </motion.div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: CONFIG.ANIMATION.DURATION.SLOW, delay: CONFIG.ANIMATION.DELAY.SHORT, ease: "easeOut" }} className="lg:col-span-6 relative h-[50vh] lg:h-[75vh] w-full rounded-[var(--radius-content)] overflow-hidden shadow-2xl border border-border/50">
                    <motion.div style={{ y: yImage }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                        <Image src={content.imageSrc} alt={content.imageAlt} fill priority sizes="(max-width: 2048px) 100vw, 50vw" className="object-cover object-center" />

                        <div className="absolute inset-0 bg-gradient-to-tr from-background/20 via-transparent to-black/10" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};