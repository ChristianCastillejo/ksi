"use client";

import React from "react";
import { motion } from "framer-motion";
import { Library, Compass, Users, HeartHandshake, ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "@/i18n/routing";

const ICON_MAP: Record<string, LucideIcon> = {
    library: Library,
    compass: Compass,
    users: Users,
    heart: HeartHandshake,
};

export interface BentoContent {
    tagline: string;
    titleMain: string;
    titleItalic: string;
    description: string;
    exploreLabel: string;
    pathways: Array<{ id: string; num: string; tag: string; title: string; desc: string; href: string; iconId: string }>;
}

export const BentoNavigation = ({ content }: { content: BentoContent }) => {
    return (
        <section className="relative w-full py-32 bg-background px-6 lg:px-16 border-t border-border/50">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-accent uppercase block mb-4">{content.tagline}</span>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1]">
                            {content.titleMain} <br /><span className="italic text-foreground/60">{content.titleItalic}</span>
                        </h2>
                    </div>
                    <p className="font-sans text-sm text-foreground/70 max-w-sm leading-relaxed">{content.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {content.pathways.map((pathway, index) => {
                        const Icon = ICON_MAP[pathway.iconId] || Library;
                        return (
                            <motion.div key={pathway.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                                <Link href={pathway.href} className="block relative h-full group bg-surface border border-border rounded-[var(--radius-surface)] p-8 lg:p-12 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5">
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-12">
                                            <div className="flex flex-col gap-2">
                                                <span className="font-serif text-accent text-lg italic">{pathway.num}</span>
                                                <span className="font-sans text-[10px] uppercase tracking-widest text-foreground/50 font-bold">{pathway.tag}</span>
                                            </div>
                                            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center bg-background group-hover:bg-primary group-hover:border-primary group-hover:text-background transition-colors duration-300">
                                                <Icon size={20} strokeWidth={1.5} />
                                            </div>
                                        </div>
                                        <div className="mt-auto">
                                            <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300">{pathway.title}</h3>
                                            <p className="font-sans text-sm text-foreground/70 leading-relaxed mb-8 max-w-md">{pathway.desc}</p>
                                            <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-foreground font-semibold">
                                                <span>{content.exploreLabel}</span>
                                                <ArrowRight size={14} className="text-primary group-hover:translate-x-2 transition-transform duration-300" />
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