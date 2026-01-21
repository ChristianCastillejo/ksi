"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Users } from "lucide-react";
import { AboutHero, type AboutHeroContent } from "../shared/AboutHero";
import { AboutFooterCTA, type AboutFooterContent } from "../shared/AboutFooterCTA";
import { AshramActivitiesSection, type ActivitiesContent } from "@/app/[locale]/ashrams/_components/AshramActivitiesSection";

export interface DelhiContent {
    hero: AboutHeroContent;
    bridgeTitle: string;
    bridgeDesc: string;
    studyTitle: string;
    studyDesc: string;
    globalTitle: string;
    globalDesc: string;
    footer: AboutFooterContent;
    activities: ActivitiesContent;
}

export default function DelhiAbout({ content }: { content: DelhiContent }) {
    return (
        <div className="bg-background">
            <AboutHero content={content.hero} />

            <section className="py-24 bg-surface md:py-32 px-6 lg:px-16 ">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-surface border border-border p-12 lg:p-16 rounded-[var(--radius-content)]">
                        <Globe size={40} className="text-accent mb-8" strokeWidth={1} />
                        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">{content.bridgeTitle}</h2>
                        <p className="font-sans text-foreground/70 leading-relaxed text-lg">
                            {content.bridgeDesc}
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-8 lg:pl-8">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <Users size={20} className="text-accent" />
                                <h3 className="font-serif text-2xl text-foreground">{content.studyTitle}</h3>
                            </div>
                            <p className="font-sans text-foreground/60 leading-relaxed">
                                {content.studyDesc}
                            </p>
                        </div>
                        <div className="w-full h-px bg-border/50 my-2" />
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <Globe size={20} className="text-accent" />
                                <h3 className="font-serif text-2xl text-foreground">{content.globalTitle}</h3>
                            </div>
                            <p className="font-sans text-foreground/60 leading-relaxed">
                                {content.globalDesc}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <AshramActivitiesSection content={content.activities} />
            <AboutFooterCTA content={content.footer} />
        </div>
    );
}