import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

interface BiographyContent {
    titleMain: string;
    titleItalic: string;
    paragraphs: React.ReactNode[];
    buttonLabel: string;
    buttonLink: string;
}

export const BiographySection = ({ content }: { content: BiographyContent }) => {
    return (
        <section className="relative w-full py-24 md:py-32 bg-surface px-6 lg:px-16 flex justify-center">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
                <div className="md:col-span-5 relative">
                    <h2 className="font-serif text-4xl md:text-6xl text-accent leading-tight sticky top-32">
                        {content.titleMain} <br /><span className="italic opacity-80">{content.titleItalic}</span>
                    </h2>
                </div>
                <div className="md:col-span-7 font-sans text-foreground/80 text-lg leading-relaxed flex flex-col gap-6">
                    {content.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}

                    <div className="mt-8">
                        <Button asChild size="lg" className="uppercase tracking-widest">
                            <Link href={content.buttonLink} className="flex items-center gap-2">
                                {content.buttonLabel} <ArrowRight />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
