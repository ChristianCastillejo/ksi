import React from "react";

export interface PartnershipContextContent {
    titleMain: string;
    titleItalic: string;
    description: string;
}

interface PartnershipContextProps {
    content: PartnershipContextContent;
}

export const PartnershipContext = ({ content }: PartnershipContextProps) => {
    return (
        <section className="relative w-full py-24 bg-surface px-6 lg:px-16 border-b border-border text-center flex justify-center">
            <div className="max-w-4xl">
                <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-8 leading-[1.2]">
                    {content.titleMain} <br />
                    <span className="italic text-accent">{content.titleItalic}</span>
                </h2>
                <p className="font-sans text-foreground/70 leading-relaxed text-base md:text-lg">
                    {content.description}
                </p>
            </div>
        </section>
    );
};
