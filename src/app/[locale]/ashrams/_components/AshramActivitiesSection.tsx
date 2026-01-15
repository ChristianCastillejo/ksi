"use client";

import { BookOpen, Flame, Sun, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

const CONFIG = {
    ANIMATION: {
        DURATION: { FAST: 0.8, NORMAL: 1.0, SLOW: 1.5 },
        DELAY: { SHORT: 0.2, NORMAL: 0.4, LONG: 0.6 },
        EASE: [0.16, 1, 0.3, 1],
    }
} as const;

const ICON_MAP: Record<string, LucideIcon> = {
    book: BookOpen,
    sun: Sun,
    flame: Flame,
};

export interface ActivityItem {
    id: string;
    iconId: string;
    title: string;
    tag: string;
    desc: string;
}

export interface ActivitiesContent {
    tagline: string;
    titleMain: string;
    titleItalic: string;
    description: string;
    items: ActivityItem[];
}

export const AshramActivitiesSection = ({ content }: { content: ActivitiesContent }) => {
    return (
        <section className="relative w-full py-32 bg-background px-6 lg:px-16 border-b border-border">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row gap-8 md:gap-24 mb-16 md:mb-24 items-start md:items-end justify-between">
                    <div className="max-w-2xl">
                        <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-accent uppercase block mb-4">
                            {content.tagline}
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1]">
                            {content.titleMain} <br />
                            <span className="italic text-foreground/60">{content.titleItalic}</span>
                        </h2>
                    </div>
                    <p className="font-sans text-sm text-foreground/70 max-w-sm leading-relaxed pb-2 border-l border-accent/30 pl-4 md:border-l-0 md:pl-0">
                        {content.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {content.items.map((act, index) => {
                        const Icon = ICON_MAP[act.iconId] || Flame;

                        return (
                            <motion.div
                                key={act.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL, delay: index * 0.15, ease: CONFIG.ANIMATION.EASE }}
                                className="group relative bg-surface border border-border p-8 lg:p-12 rounded-[var(--radius-content)] hover:border-accent/40 transition-colors duration-500 overflow-hidden flex flex-col"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-12">
                                        <div className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center bg-background group-hover:border-accent transition-colors duration-500">
                                            <Icon size={20} strokeWidth={1.5} className="text-accent transition-colors duration-500" />
                                        </div>
                                        <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-foreground/40 uppercase bg-background px-3 py-1 rounded-full border border-border">
                                            {act.tag}
                                        </span>
                                    </div>

                                    <div className="mt-auto">
                                        <h3 className="font-serif text-3xl text-foreground mb-4">
                                            {act.title}
                                        </h3>
                                        <p className="font-sans text-sm text-foreground/70 leading-relaxed">
                                            {act.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};