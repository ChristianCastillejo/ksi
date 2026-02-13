import React from "react";

export interface HeroContactContent {
    titleMain: string;
    titleItalic: string;
}

export const HeroContact = ({ content }: { content: HeroContactContent }) => (
    <section className="relative w-full pt-32 pb-16 bg-background flex flex-col items-center text-center px-6 border-b border-border/50">
        <h1 className="font-serif text-5xl md:text-7xl text-foreground leading-[1.1] tracking-tight max-w-3xl">
            {content.titleMain} <span className="italic text-foreground/70">{content.titleItalic}</span>
        </h1>
    </section>
);