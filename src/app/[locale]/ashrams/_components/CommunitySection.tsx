import React from "react";
import { Facebook, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export interface CommunityContent {
    title: string;
    description: string;
    buttonLabel: string;
    facebookLink: string;
}

interface CommunitySectionProps {
    content: CommunityContent;
}

export const CommunitySection = ({ content }: CommunitySectionProps) => {
    return (
        <section className="relative w-full py-32 bg-secondary text-secondary-foreground px-6 flex justify-center text-center">
            <div className="max-w-3xl flex flex-col items-center">
                <Facebook size={32} className="text-accent mb-8" strokeWidth={1} />

                <h2 className="font-serif text-4xl md:text-5xl text-background mb-6 leading-[1.2]">
                    {content.title}
                </h2>
                <p className="font-sans text-secondary-foreground/70 leading-relaxed text-lg mb-12 max-w-xl">
                    {content.description}
                </p>

                <Button asChild size="lg" className="uppercase tracking-widest">
                    <Link href={content.facebookLink} target="_blank" rel="noopener noreferrer">
                        {content.buttonLabel} <ExternalLink size={16} />
                    </Link>
                </Button>
            </div>
        </section>
    );
};
