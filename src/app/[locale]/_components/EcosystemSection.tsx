"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type TenantId } from "@/lib/tenant";

export interface EcosystemCenter {
    id: string;
    name: string;
    role: string;
    desc: string;
    url: string;
    cta: string;
}

export interface EcosystemContent {
    tagline: string;
    titleMain: string;
    titleItalic: string;
    btnLabel: string;
    currentBadge: string;
    centers: EcosystemCenter[];
}

interface EcosystemSectionProps {
    currentTenant: TenantId;
    content: EcosystemContent;
}

export const EcosystemSection = ({ currentTenant, content }: EcosystemSectionProps) => {
    return (
        <section className="relative w-full py-32 bg-surface px-6 lg:px-16 border-b border-border">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                    <div>
                        <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-accent uppercase block mb-4">
                            {content.tagline}
                        </span>
                        <h2 className="font-serif text-4xl md:text-6xl text-foreground leading-[1.1]">
                            {content.titleMain} <br />
                            <span className="italic text-foreground/60">{content.titleItalic}</span>
                        </h2>
                    </div>

                    <Button asChild variant="outline" className="uppercase tracking-widest text-xs border-border hover:bg-foreground/5 hover:border-foreground/30">
                        <Link href="/ashrams">
                            {content.btnLabel} <MapPin size={14} className="ml-2" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {content.centers.map((center, i) => {
                        const isCurrent = center.id === currentTenant;

                        const CardWrapper = isCurrent ? "div" : "a";
                        const wrapperProps = isCurrent
                            ? {}
                            : {
                                href: center.url,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                "aria-label": `${center.cta} ${center.name}`
                            };

                        return (
                            <motion.div
                                key={center.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <CardWrapper
                                    {...wrapperProps}
                                    className={cn(
                                        "block h-full outline-none rounded-[var(--radius-content)]",
                                        !isCurrent && "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background group cursor-pointer",
                                        isCurrent && "cursor-default"
                                    )}
                                >
                                    <Card
                                        variant={isCurrent ? "stable" : "default"}
                                        className={cn(
                                            "relative flex flex-col h-full bg-background border p-8 lg:p-12 rounded-[var(--radius-content)] transition-all duration-500 overflow-hidden",
                                            isCurrent
                                                ? "border-accent/60 shadow-sm"
                                                : "border-border hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5"
                                        )}>

                                        {!isCurrent && (
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary)_0%,transparent_60%)] opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none" />
                                        )}

                                        <CardContent className="p-0 flex flex-col h-full relative z-10">
                                            <div className="flex flex-col flex-grow">
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-accent uppercase block">
                                                        {center.role}
                                                    </span>
                                                    {isCurrent && (
                                                        <span className="font-sans text-[9px] font-bold tracking-widest uppercase bg-accent/10 text-accent px-2 py-1 rounded-full">
                                                            {content.currentBadge}
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className={cn(
                                                    "font-serif text-3xl md:text-4xl text-foreground mb-4 transition-colors duration-300",
                                                    !isCurrent && "group-hover:text-primary"
                                                )}>
                                                    {center.name}
                                                </h3>

                                                <p className="font-sans text-sm text-foreground/70 leading-relaxed mb-12">
                                                    {center.desc}
                                                </p>

                                                {!isCurrent && (
                                                    <div className="mt-auto pt-6 border-t border-border flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-foreground font-bold">
                                                        <span className="group-hover:text-primary transition-colors duration-300">
                                                            {center.cta}
                                                        </span>
                                                        <ExternalLink
                                                            aria-hidden="true"
                                                            size={14}
                                                            className="text-primary group-hover:translate-x-2 transition-transform duration-300"
                                                        />
                                                    </div>
                                                )}

                                                {isCurrent && (
                                                    <div className="mt-auto pt-6 border-t border-accent/20" />
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CardWrapper>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};