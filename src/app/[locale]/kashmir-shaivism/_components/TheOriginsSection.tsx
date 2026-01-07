import React from "react";

export interface OriginsContent {
    tagline: string;
    titleMain: string;
    titleItalic: string;
    contextDesc: string;
    contentPart1: React.ReactNode;
    contentPart2: React.ReactNode;
    subtitle: string;
    contentPart3: React.ReactNode;
    contentPart4: React.ReactNode;
}

export interface TheOriginsSectionProps {
    content: OriginsContent;
}

export const TheOriginsSection = ({ content }: TheOriginsSectionProps) => {
    return (
        <section className="relative w-full py-32 bg-background px-6 lg:px-16 border-t border-border">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start relative">

                <div className="lg:col-span-5 lg:sticky lg:top-40 flex flex-col gap-8">
                    <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-accent uppercase block">
                        {content.tagline}
                    </span>
                    <h2 className="font-serif text-5xl md:text-6xl text-foreground leading-[1.1]">
                        {content.titleMain} <br />
                        <span className="italic text-foreground/60">{content.titleItalic}</span>
                    </h2>
                    <p className="font-sans text-sm text-foreground/60 leading-relaxed border-l-2 border-accent/30 pl-4 mt-4">
                        {content.contextDesc}
                    </p>
                </div>

                <div className="lg:col-span-7 font-sans text-base md:text-lg text-foreground/80 leading-[1.8] flex flex-col gap-10">
                    <div>
                        <p>
                            <span className="text-7xl text-accent font-serif float-left mr-5 leading-[0.8] mt-2">T</span>
                            {content.contentPart1}
                        </p>
                        <p className="mt-6">
                            {content.contentPart2}
                        </p>
                    </div>

                    <hr className="border-border/50 my-4" />

                    <div>
                        <h3 className="font-serif text-3xl text-foreground mb-6">{content.subtitle}</h3>
                        <p>
                            {content.contentPart3}
                        </p>
                        <p className="mt-6">
                            {content.contentPart4}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
