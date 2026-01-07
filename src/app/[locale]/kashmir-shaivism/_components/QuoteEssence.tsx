"use client";

import React from "react";
import { motion } from "framer-motion";
import { CONFIG } from "./config";

export interface QuoteEssenceContent {
    quote: React.ReactNode;
    author: string;
}

export interface QuoteEssenceProps {
    content: QuoteEssenceContent;
}

export const QuoteEssence = ({ content }: QuoteEssenceProps) => {
    return (
        <section className="relative w-full py-32 md:py-48 bg-surface text-foreground flex justify-center items-center px-6">
            <div className="max-w-5xl text-center flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL }}
                    className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.2] tracking-tight text-foreground"
                >
                    {content.quote}
                </motion.div>
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL, delay: CONFIG.ANIMATION.DELAY.NORMAL }}
                    className="mt-12 font-sans text-xs font-bold tracking-[0.2em] text-foreground/50 uppercase"
                >
                    {content.author}
                </motion.span>
            </div>
        </section>
    );
};
