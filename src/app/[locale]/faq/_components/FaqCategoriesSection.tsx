"use client";

import React from "react";
import { motion } from "framer-motion";
import { HelpCircle, BookOpen, MapPin, Globe, ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { CONFIG } from "./config";

export interface FaqItem {
    q: string;
    a: string;
}

export interface FaqCategory {
    id: string;
    title: string;
    iconId: string;
    faqs: FaqItem[];
}

export interface FaqCategoriesContent {
    navLabel: string;
    navTitleMain: string;
    navTitleItalic: string;
    exploreButtonText: string;
    categories: FaqCategory[];
}

interface FaqCategoriesSectionProps {
    content: FaqCategoriesContent;
}

const ICON_MAP: Record<string, LucideIcon> = {
    helpCircle: HelpCircle,
    bookOpen: BookOpen,
    mapPin: MapPin,
    globe: Globe,
};

export const FaqCategoriesSection = ({ content }: FaqCategoriesSectionProps) => {
    return (
        <section className="max-w-7xl mx-auto px-6 lg:px-16 mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24 items-start">

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL }}
                    className="lg:col-span-4 lg:sticky lg:top-32 hidden lg:flex flex-col gap-8"
                >
                    <div>
                        <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-accent uppercase block mb-4">
                            {content.navLabel}
                        </span>
                        <h2 className="font-serif text-4xl text-foreground leading-[1.1] mb-6">
                            {content.navTitleMain} <br />
                            <span className="italic text-foreground/60">{content.navTitleItalic}</span>
                        </h2>
                    </div>

                    <ul className="flex flex-col gap-2">
                        {content.categories.map((category) => {
                            const Icon = ICON_MAP[category.iconId] || HelpCircle;
                            return (
                                <li key={`nav-${category.id}`}>
                                    <a
                                        href={`#${category.id}`}
                                        className="flex items-center gap-3 py-3 px-4 rounded-[var(--radius-interaction)] text-foreground/70 hover:text-foreground hover:bg-surface transition-colors font-sans text-sm"
                                    >
                                        <Icon size={16} className="text-accent" />
                                        {category.title}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </motion.div>

                <div className="lg:col-span-8 flex flex-col gap-16 md:gap-24">
                    {content.categories.map((category, index) => {
                        const Icon = ICON_MAP[category.iconId] || HelpCircle;
                        return (
                            <motion.div
                                key={category.id}
                                id={category.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: CONFIG.ANIMATION.DURATION.FAST, delay: index * 0.1 }}
                                className="scroll-mt-32"
                            >
                                <div className="flex items-center gap-3 mb-8 border-b border-border pb-4">
                                    <Icon size={24} className="text-accent" />
                                    <h3 className="font-serif text-3xl text-foreground">{category.title}</h3>
                                </div>

                                <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
                                    {category.faqs.map((faq, i) => (
                                        <AccordionItem
                                            key={i}
                                            value={`item-${category.id}-${i}`}
                                            className="bg-surface border border-border overflow-hidden px-6 rounded-[var(--radius-content)] data-[state=open]:border-accent/30 data-[state=open]:shadow-md transition-shadow transition-border duration-500"
                                        >
                                            <AccordionTrigger className="font-sans text-left text-base md:text-lg font-medium text-foreground hover:no-underline hover:text-accent transition-colors py-6">
                                                {faq.q}
                                            </AccordionTrigger>

                                            <AccordionContent className="font-sans text-foreground/70 leading-relaxed pb-2 text-base">
                                                {faq.a}

                                                {faq.q.includes("internationally") && (
                                                    <><br />
                                                        <Button variant="secondary" asChild className="mt-4 sm:w-auto uppercase tracking-widest text-xs">
                                                            <Link href="https://www.lakshmanjooacademy.org/books" target="_blank" rel="noopener noreferrer">
                                                                {content.exploreButtonText} <ArrowRight size={14} className="ml-2" />
                                                            </Link>
                                                        </Button>
                                                    </>
                                                )}
                                                {faq.q.includes("online resources") && (
                                                    <><br />
                                                        <Button variant="secondary" asChild className="mt-4 sm:w-auto uppercase tracking-widest text-xs">
                                                            <Link href="https://www.lakshmanjooacademy.org/free-weekly-sangha" target="_blank" rel="noopener noreferrer">
                                                                {content.exploreButtonText} <ArrowRight size={14} className="ml-2" />
                                                            </Link>
                                                        </Button>
                                                    </>
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};
