"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Flame, BookOpen, ExternalLink, ArrowRight, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CONFIG } from "./config";

export interface ResourceItem {
    id: string;
    iconId: string;
    title: string;
    tag: string;
    desc: string;
    url: string;
    cta: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
    users: Users,
    flame: Flame,
    book: BookOpen,
};

export interface ExternalResourcesContent {
    resources: ResourceItem[];
}

interface ExternalResourcesGridProps {
    content: ExternalResourcesContent;
}

export const ExternalResourcesGrid = ({ content }: ExternalResourcesGridProps) => {
    return (
        <section className="relative w-full py-32 bg-background px-6 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {content.resources.map((resource, i) => {
                        const Icon = ICON_MAP[resource.iconId] || BookOpen;
                        return (
                            <motion.div
                                key={resource.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL, delay: i * 0.15, ease: CONFIG.ANIMATION.EASE }}
                            >
                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block h-full outline-none group"
                                >
                                    <Card
                                        className="relative flex flex-col h-full bg-surface border-border p-8 lg:p-12 rounded-[var(--radius-content)] hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary)_0%,transparent_60%)] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none" />

                                        <CardContent className="p-0 flex flex-col h-full relative z-10">
                                            <div className="flex justify-between items-start mb-12">
                                                <div className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center bg-background group-hover:bg-accent transition-colors duration-500">
                                                    <Icon size={20} strokeWidth={1.5} className="text-accent group-hover:text-background transition-colors duration-500" />
                                                </div>
                                                <ExternalLink size={18} className="text-primary" />
                                            </div>

                                            <div className="flex flex-col flex-grow">
                                                <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-accent uppercase block mb-4">
                                                    {resource.tag}
                                                </span>
                                                <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4 transition-colors duration-300">
                                                    {resource.title}
                                                </h3>
                                                <p className="font-sans text-sm text-foreground/70 leading-relaxed mb-12">
                                                    {resource.desc}
                                                </p>

                                                <div className="mt-auto pt-6 border-t border-border/50 flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-foreground font-semibold">
                                                    <span className="group-hover:text-primary transition-colors">{resource.cta}</span>
                                                    <ArrowRight size={14} className="text-primary group-hover:translate-x-2 transition-transform duration-300" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </a>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
