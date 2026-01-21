"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, HeartHandshake, ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
    book: BookOpen,
    heart: HeartHandshake,
};

export interface FooterCTACard {
    id: string;
    num: string;
    tag: string;
    title: string;
    desc: string;
    href: string;
    iconId: string;
    ctaText: string;
}

export interface AboutFooterContent {
    tagline: string;
    titleMain: string;
    titleItalic: string;
    cards: FooterCTACard[];
}

export const AboutFooterCTA = ({ content }: { content: AboutFooterContent }) => {
    return (
        <section className="relative w-full py-32 bg-surface px-6 lg:px-16 border-t border-border/50">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
                    <span className="font-sans text-[11px] font-bold tracking-[0.3em] text-accent uppercase block mb-6">
                        {content.tagline}
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] max-w-2xl">
                        {content.titleMain} <br />
                        <span className="italic text-foreground/60">{content.titleItalic}</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {content.cards.map((card, index) => {
                        const Icon = ICON_MAP[card.iconId] || BookOpen;

                        return (
                            <motion.div key={card.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}>
                                <Link href={card.href} className={cn("block relative h-full group border rounded-[var(--radius-surface)] p-8 lg:p-12 overflow-hidden transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background", "bg-background border-border text-foreground hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5")}>
                                    <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500", "bg-gradient-to-br from-transparent to-primary/5")} />
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-16">
                                            <div className="flex flex-col gap-2">
                                                <span className="font-serif text-lg italic text-accent">{card.num}</span>
                                                <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-foreground/50">{card.tag}</span>
                                            </div>
                                            <div className="w-12 h-12 rounded-full border flex items-center justify-center transition-colors duration-300 border-border text-foreground group-hover:bg-primary group-hover:border-primary group-hover:text-background">
                                                <Icon size={20} strokeWidth={1.5} />
                                            </div>
                                        </div>
                                        <div className="mt-auto">
                                            <h3 className="font-serif text-3xl md:text-4xl mb-4 transition-colors duration-300 group-hover:text-primary">{card.title}</h3>
                                            <p className="font-sans text-sm leading-relaxed mb-8 max-w-md text-foreground/70">{card.desc}</p>
                                            <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-semibold">
                                                <span className="transition-colors duration-300 text-foreground group-hover:text-primary">{card.ctaText}</span>
                                                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-2 text-primary" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};