import React from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export interface FooterCTAContent {
    title: string;
    faqBtn: string;
    contactBtn: string;
}

export const HomeFooterCTA = ({ content }: { content: FooterCTAContent }) => {
    return (
        <section className="relative w-full py-24 bg-background border-t border-border flex justify-center text-center px-6">
            <div className="max-w-2xl flex flex-col items-center">
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                    {content.title}
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Button asChild size="lg" >
                        <Link href="/faq">{content.faqBtn}</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" >
                        <Link href="/contact">{content.contactBtn}</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};