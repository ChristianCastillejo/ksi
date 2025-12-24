"use client";
import { motion } from "framer-motion";

export interface ManifestoContent {
    prefix: string;
    highlight: string;
    suffix: string;
}

export const ManifestoText = ({ content }: { content: ManifestoContent }) => (
    <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground leading-[1.2] tracking-tight text-balance"
    >
        {content.prefix} <span className="italic text-accent">{content.highlight}</span> {content.suffix}
    </motion.h2>
);