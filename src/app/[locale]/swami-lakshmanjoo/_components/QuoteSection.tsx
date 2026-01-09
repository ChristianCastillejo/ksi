"use client";

import React from "react";
import { motion } from "framer-motion";
import { ANIMATION, VIEWPORT } from "./constants";

interface QuoteContent {
    textMain: string;
    textItalic: string;
    textEnd: string;
}

export const QuoteSection = ({ content }: { content: QuoteContent }) => {
    return (
        <section className="relative w-full py-32 md:py-48 bg-background text-foreground flex justify-center items-center px-6">
            <div className="max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: ANIMATION.DURATION.FAST }}
                    className="text-accent font-serif text-8xl leading-none h-12 mb-6 opacity-40"
                >
                    &ldquo;
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: ANIMATION.DISTANCE.Y_LONG }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: VIEWPORT.MARGIN_PX }}
                    transition={{ duration: ANIMATION.DURATION.NORMAL }}
                    className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.2] tracking-tight text-foreground"
                >
                    {content.textMain} <br />
                    <span className="italic font-medium text-accent">{content.textItalic}</span> {content.textEnd}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: ANIMATION.DURATION.NORMAL, delay: ANIMATION.DELAY.NORMAL }}
                    className="mt-16 w-px h-24 bg-accent/30 mx-auto"
                />
            </div>
        </section>
    );
};
