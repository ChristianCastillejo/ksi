import React from "react";
import { BookOpen, MapPin } from "lucide-react";

export interface EssenceContent {
    tagline: string;
    titleMain: string;
    titleItalic: string;
    dropCap: string;
    paragraph: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
}

interface EssenceOfProgramsSectionProps {
    content: EssenceContent;
}

export const EssenceOfProgramsSection = ({ content }: EssenceOfProgramsSectionProps) => {
    return (
        <section className="relative w-full py-32 bg-background px-6 lg:px-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                <div className="lg:col-span-5 lg:sticky lg:top-40 flex flex-col gap-8">
                    <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-accent uppercase block">
                        {content.tagline}
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1]">
                        {content.titleMain} <br />
                        <span className="italic text-foreground/60">{content.titleItalic}</span>
                    </h2>
                </div>
                <div className="lg:col-span-7 font-sans text-base md:text-lg text-foreground/80 leading-[1.8] flex flex-col gap-10">
                    <p>
                        <span className="text-7xl text-accent font-serif float-left mr-5 leading-[0.8] mt-2">
                            {content.dropCap}
                        </span>
                        {content.paragraph}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
                        <div className="flex flex-col gap-3">
                            <BookOpen size={24} className="text-accent mb-2" strokeWidth={1.5} />
                            <h3 className="font-serif text-2xl text-foreground">{content.feature1Title}</h3>
                            <p className="text-sm text-foreground/70 leading-relaxed">
                                {content.feature1Desc}
                            </p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <MapPin size={24} className="text-accent mb-2" strokeWidth={1.5} />
                            <h3 className="font-serif text-2xl text-foreground">{content.feature2Title}</h3>
                            <p className="text-sm text-foreground/70 leading-relaxed">
                                {content.feature2Desc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};