import React from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export interface WaitlistContent {
    title: string;
    description: string;
    buttonLabel: string;
}

interface WaitlistSectionProps {
    content: WaitlistContent;
}

export function WaitlistSection({ content }: WaitlistSectionProps) {
    return (
        <section className="relative w-full py-32 bg-surface px-6 lg:px-16 border-t border-border flex justify-center">
            <div className="max-w-3xl w-full text-center flex flex-col items-center bg-background border border-border p-16 md:p-24 shadow-sm">
                <Calendar size={32} className="text-accent mb-6" strokeWidth={1} />
                <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
                    {content.title}
                </h2>
                <p className="font-sans text-base text-foreground/70 leading-relaxed mb-10 max-w-lg">
                    {content.description}
                </p>

                <Button variant="primary" size="lg" asChild className="uppercase tracking-widest shadow-xl shadow-primary/20">
                    <Link href="/storebook" className="flex items-center gap-2">
                        {content.buttonLabel} <ArrowRight size={16} />
                    </Link>
                </Button>
            </div>
        </section>
    );
}