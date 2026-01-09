"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionStyle } from "framer-motion";
import { cn } from "@/lib/utils";
import { ANIMATION, SCROLL_OFFSETS, VIEWPORT } from "./constants";

interface TimelineItem {
    year: string;
    title: string;
    description: string;
}

interface TimelineContent {
    title: string;
    tagline: string;
    items: TimelineItem[];
}

export const TimelineSection = ({ content }: { content: TimelineContent }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
    const scaleY = useTransform(scrollYProgress, SCROLL_OFFSETS.SCROLLYTELLING.INPUT as unknown as number[], SCROLL_OFFSETS.SCROLLYTELLING.OUTPUT as unknown as number[]);

    return (
        <section ref={ref} className="relative w-full py-32 bg-background px-6 lg:px-0">
            <div className="max-w-5xl mx-auto relative">
                <div className="text-center mb-32">
                    <h2 className="font-serif text-4xl text-foreground">{content.title}</h2>
                    <p className="font-sans text-sm font-medium tracking-widest uppercase text-accent mt-4">{content.tagline}</p>
                </div>

                <div className="absolute left-6 md:left-1/2 top-48 bottom-0 w-[1px] bg-border -translate-x-1/2 origin-top">
                    <motion.div style={{ scaleY } as MotionStyle} className="w-full h-full bg-accent origin-top" />
                </div>

                <div className="flex flex-col gap-24 md:gap-40">
                    {content.items.map((item, index) => (
                        <TimelineNode key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const TimelineNode = ({ item, index }: { item: TimelineItem, index: number }) => {
    const isEven = index % 2 === 0;
    return (
        <motion.div
            initial={{ opacity: 0, y: ANIMATION.DISTANCE.Y_EXTRA_LONG }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: VIEWPORT.MARGIN_PERCENT }}
            transition={{ duration: ANIMATION.DURATION.FAST }}
            className={cn("relative flex flex-col md:flex-row items-start md:items-center w-full", isEven ? "md:justify-start" : "md:justify-end")}
        >
            <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-background border-[3px] border-accent rounded-full -translate-x-[7px] md:-translate-x-1/2 z-10 md:mt-0 mt-1" />

            <div className={cn("pl-12 md:pl-0 md:w-[45%]", isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left")}>
                <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-accent uppercase block mb-3">{item.year}</span>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">{item.title}</h3>
                <p className="font-sans text-foreground/80 leading-relaxed text-sm md:text-base">{item.description}</p>
            </div>
        </motion.div>
    );
};
