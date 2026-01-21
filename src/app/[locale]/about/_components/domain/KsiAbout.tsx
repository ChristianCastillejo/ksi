"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { AboutHero, type AboutHeroContent } from "../shared/AboutHero";
import { AboutFooterCTA, type AboutFooterContent } from "../shared/AboutFooterCTA";
import { AshramActivitiesSection, type ActivitiesContent } from "@/app/[locale]/ashrams/_components/AshramActivitiesSection";

export interface MasterData { period: string; name: string; work: string; }

export interface KsiContent {
    hero: AboutHeroContent;
    trikaTitle: string;
    trikaDesc: React.ReactNode;
    divineTag: string;
    divineQuote: string;
    kstsTitle: string;
    kstsDesc1: string;
    kstsDesc2: string;
    lineageTag: string;
    lineageTitle: string;
    masters: MasterData[];
    footer: AboutFooterContent;
    activities: ActivitiesContent;
}

export default function KsiAbout({ content }: { content: KsiContent }) {
    return (
        <div className="bg-background">
            <AboutHero content={content.hero} />

            <section className="bg-surface">
                <div className="py-24 bg-surface md:py-32 px-6 lg:px-16 max-w-7xl mx-auto border-b border-border/50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">{content.trikaTitle}</h2>
                            <p className="font-sans text-foreground/70 leading-relaxed mb-6 text-lg">
                                {content.trikaDesc}
                            </p>
                        </div>
                        <div className="bg-background p-10 md:p-14 border border-border">
                            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-accent block mb-4">{content.divineTag}</span>
                            <p className="font-serif text-2xl text-foreground/80 leading-relaxed italic">
                                "{content.divineQuote}"
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32 text-foreground px-6 lg:px-16">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
                    <div className="md:w-1/3 flex justify-center">
                        <BookOpen size={120} strokeWidth={0.5} className="text-accent/60" />
                    </div>
                    <div className="md:w-2/3">
                        <h2 className="font-serif text-4xl md:text-5xl mb-6">{content.kstsTitle}</h2>
                        <p className="font-sans text-foreground/70 leading-relaxed text-lg mb-6">{content.kstsDesc1}</p>
                        <p className="font-sans text-foreground/70 leading-relaxed text-lg">{content.kstsDesc2}</p>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32 px-6 lg:px-16 bg-surface">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-accent block mb-4">{content.lineageTag}</span>
                        <h2 className="font-serif text-4xl md:text-5xl text-foreground">{content.lineageTitle}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                        {content.masters.map((master, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, delay: i * 0.1 }} className="border-t border-border pt-6">
                                <span className="font-sans text-[10px] font-bold tracking-widest text-accent uppercase block mb-3">{master.period}</span>
                                <h3 className="font-serif text-2xl text-foreground mb-3">{master.name}</h3>
                                <p className="font-sans text-sm text-foreground/60 leading-relaxed italic">{master.work}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <AshramActivitiesSection content={content.activities} />
            <AboutFooterCTA content={content.footer} />
        </div>
    );
}