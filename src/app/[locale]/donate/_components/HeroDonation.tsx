"use client";
import { motion } from "framer-motion";

export interface HeroDonationContent {
    tagline: string;
    titleMain: string;
    titleItalic: string;
    description: string;
}

export const HeroDonation = ({ content }: { content: HeroDonationContent }) => {
    return (
        <section className="relative w-full pt-32 pb-16 bg-background flex flex-col items-center text-center px-6 border-b border-border/50">
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
                {content.titleMain} <span className="italic text-foreground/70">{content.titleItalic}</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8 text-foreground/60 font-sans text-base max-w-xl leading-relaxed"
            >
                {content.description}
            </motion.p>
        </section>
    );
};