import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export interface PhilosophyCTAContent {
    titleMain: string;
    titleItalic: string;
    p1: React.ReactNode;
    quote: React.ReactNode;
    buttonLabel: string;
    linkHref: string;
}

export interface PhilosophyCTAProps {
    content: PhilosophyCTAContent;
}

export const PhilosophyCTA = ({ content }: PhilosophyCTAProps) => {
    return (
        <section className="relative w-full py-32 lg:py-48 bg-secondary overflow-hidden flex justify-center px-6 text-center">
            <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-3xl w-full flex flex-col items-center relative z-10">
                <BookOpen size={32} className="text-accent mb-8" strokeWidth={1} />

                <h2 className="font-serif text-4xl md:text-6xl text-background mb-8 leading-[1.1]">
                    {content.titleMain} <br />
                    <span className="italic text-background/80">{content.titleItalic}</span>
                </h2>

                <p className="font-sans text-base md:text-lg text-background/60 leading-relaxed mb-12">
                    {content.p1} <br /><br />
                    <em className="text-background">{content.quote}</em>
                </p>

                <Button asChild size="lg" className="uppercase tracking-widest group shadow-2xl shadow-primary/20">
                    <Link href={content.linkHref}>
                        {content.buttonLabel} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </div>
        </section>
    );
};
