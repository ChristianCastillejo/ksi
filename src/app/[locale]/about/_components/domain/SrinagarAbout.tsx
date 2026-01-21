"use client";

import { motion } from "framer-motion";
import { AboutHero, type AboutHeroContent } from "../shared/AboutHero";
import { AboutFooterCTA, type AboutFooterContent } from "../shared/AboutFooterCTA";
import { AshramActivitiesSection, type ActivitiesContent } from "@/app/[locale]/ashrams/_components/AshramActivitiesSection";

export interface SrinagarContent {
    hero: AboutHeroContent;
    estTitlePrefix: string;
    estYear: string;
    p1: string;
    p2: string;
    footer: AboutFooterContent;
    activities: ActivitiesContent;
}

export default function SrinagarAbout({ content }: { content: SrinagarContent }) {
    return (
        <div className="bg-background">
            <AboutHero content={content.hero} />

            <section className="py-24 bg-surface w-full md:py-32 px-6 lg:px-16 mx-auto text-center border-b border-border/50">
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-4xl md:text-6xl text-foreground mb-10">
                    {content.estTitlePrefix} <span className="italic text-accent">{content.estYear}</span>
                </motion.h2>
                <div className="font-sans text-lg text-foreground/70 leading-relaxed space-y-8 max-w-3xl mx-auto">
                    <p>{content.p1}</p>
                    <p>{content.p2}</p>
                </div>
            </section>

            <AshramActivitiesSection content={content.activities} />
            <AboutFooterCTA content={content.footer} />
        </div>
    );
}