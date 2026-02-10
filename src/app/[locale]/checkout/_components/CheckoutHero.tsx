"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export interface CheckoutHeroContent {
    shippingTag: string;
    titleMain: string;
    titleItalic: string;
}

export const CheckoutHero = ({ content }: { content: CheckoutHeroContent }) => (
    <section className="relative w-full pt-32 pb-16 bg-surface flex flex-col items-center text-center px-6 border-b border-border/50">
        <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-6 flex items-center gap-2"
        >
            <MapPin size={14} /> {content.shippingTag}
        </motion.span>
        <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-7xl text-foreground leading-[1.1] tracking-tight max-w-3xl"
        >
            {content.titleMain} <span className="italic text-foreground/70">{content.titleItalic}</span>
        </motion.h1>
    </section>
);