"use client";

import React from "react";
import { motion } from "framer-motion";
import { CONFIG } from "./config";

export interface TeachingItem {
    id: string;
    title: string;
    subtitle: string;
    desc: React.ReactNode;
}

export interface TeachingsIndexContent {
    title: string;
    subtitle: string;
    items: TeachingItem[];
}

export interface TheTeachingsIndexProps {
    content: TeachingsIndexContent;
}

export const TheTeachingsIndex = ({ content }: TheTeachingsIndexProps) => {
    return (
        <section className="relative w-full py-32 bg-surface px-6 lg:px-16 border-y border-border">
            <div className="max-w-7xl mx-auto">
                <div className="mb-24 md:mb-32">
                    <h2 className="font-serif text-4xl md:text-6xl text-foreground mb-4">{content.title}</h2>
                    <p className="font-sans text-sm font-bold tracking-widest uppercase text-accent">{content.subtitle}</p>
                </div>

                <div className="flex flex-col">
                    {content.items.map((row, i) => (
                        <motion.div
                            key={row.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: CONFIG.ANIMATION.DURATION.FAST, delay: i * 0.1 }}
                            className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-12 md:py-16 border-t border-border first:border-t-0 items-start hover:bg-background/50 transition-colors duration-500"
                        >
                            <div className="md:col-span-2 font-serif text-3xl md:text-5xl text-accent/30 group-hover:text-accent transition-colors duration-500">
                                {row.id}.
                            </div>

                            <div className="md:col-span-4 flex flex-col gap-2">
                                <h3 className="font-serif text-3xl md:text-4xl text-foreground">{row.title}</h3>
                                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                                    {row.subtitle}
                                </span>
                            </div>

                            <div className="md:col-span-6 flex items-center h-full mt-4 md:mt-0">
                                <p className="font-sans text-base text-foreground/70 leading-relaxed max-w-lg">
                                    {row.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
