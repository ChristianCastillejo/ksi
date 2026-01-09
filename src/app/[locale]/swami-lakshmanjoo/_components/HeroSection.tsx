"use client";

import React from "react";
import { motion, useTransform, MotionValue, type MotionStyle } from "framer-motion";
import Image from "next/image";
import { ANIMATION, SCROLL_OFFSETS } from "./constants";

interface HeroContent {
    tagline: string;
    titleMain: string;
    titleItalic: string;
    description: string;
    imageAlt: string;
    archiveLabel: string;
}

interface HeroSectionProps {
    scrollYProgress: MotionValue<number>;
    content: HeroContent;
}

export const HeroSection = ({ scrollYProgress, content }: HeroSectionProps) => {
    const yText = useTransform(scrollYProgress, SCROLL_OFFSETS.HERO.INPUT as unknown as number[], SCROLL_OFFSETS.HERO.TEXT_OUTPUT as unknown as number[]);
    const yImage = useTransform(scrollYProgress, SCROLL_OFFSETS.HERO.INPUT as unknown as number[], SCROLL_OFFSETS.HERO.IMAGE_OUTPUT as unknown as number[]);

    return (
        <section className="relative min-h-[100vh] w-full bg-secondary pt-32 pb-20 px-6 lg:px-16 flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center relative z-10">

                <motion.div style={{ y: yText } as MotionStyle} className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: ANIMATION.DURATION.FAST, ease: ANIMATION.EASE.OUT }}
                        className="w-12 h-[1px] bg-background/30 mb-8 origin-left"
                    />

                    <motion.span
                        initial={{ opacity: 0, y: ANIMATION.DISTANCE.Y_SHORT }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: ANIMATION.DURATION.FAST, delay: ANIMATION.DELAY.SHORT }}
                        className="text-[10px] md:text-[12px] font-sans uppercase tracking-[0.3em] text-background/60 mb-8 block"
                    >
                        {content.tagline}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: ANIMATION.DISTANCE.Y_NORMAL }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: ANIMATION.DURATION.NORMAL, delay: ANIMATION.DELAY.NORMAL, ease: ANIMATION.EASE.SPRING }}
                        className="font-serif text-6xl md:text-8xl lg:text-[110px] text-background font-medium tracking-tight leading-[0.9]"
                    >
                        {content.titleMain}<br />
                        <span className="italic text-background/80 ml-8 lg:ml-24">{content.titleItalic}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: ANIMATION.DURATION.NORMAL, delay: ANIMATION.DELAY.EXTRA_LONG }}
                        className="mt-12 text-background/50 font-sans text-sm md:text-base max-w-sm leading-relaxed"
                    >
                        {content.description}
                    </motion.p>
                </motion.div>

                <motion.div style={{ y: yImage } as MotionStyle} className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
                    <motion.div
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: ANIMATION.DURATION.SLOW, delay: ANIMATION.DELAY.LONG, ease: ANIMATION.EASE.OUT }}
                        className="relative"
                    >
                        <div className="bg-background/30 p-3 pb-12 shadow-2xl relative border border-background/5">
                            <div className="relative w-[280px] h-[350px] md:w-[320px] md:h-[400px] overflow-hidden bg-muted">
                                <Image
                                    src="/images/swami-lakshmanjoo/garden-black.jpg"
                                    alt={content.imageAlt}
                                    fill
                                    priority
                                    className="object-cover object-top sepia-[.15] grayscale-[0.6] contrast-125"
                                />
                            </div>
                            <div className="absolute bottom-4 left-4 font-sans text-[9px] font-medium uppercase tracking-widest text-background/40">
                                {content.archiveLabel}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
