"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CONFIG } from "./config";

export interface OtherAshramItem {
    city: string;
    role: string;
    desc: string;
    phone: string;
    email: string;
    address: string;
}

export interface OtherAshramsContent {
    title: string;
    subtitle: string;
    bookingContactLabel: string;
    note: string;
    items: OtherAshramItem[];
}

interface OtherAshramsSectionProps {
    content: OtherAshramsContent;
}

export const OtherAshramsSection = ({ content }: OtherAshramsSectionProps) => {
    return (
        <section className="relative w-full py-32 bg-background px-6 lg:px-16 border-b border-border">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">{content.title}</h2>
                    <p className="font-sans text-sm tracking-widest uppercase text-accent">{content.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {content.items.map((ashram, i) => (
                        <motion.div
                            key={ashram.city}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: CONFIG.ANIMATION.DURATION.FAST, delay: i * 0.1 }}
                        >
                            <Card variant="stable" className="h-full bg-surface border-border hover:border-accent/30 transition-colors p-8 md:p-12 flex flex-col justify-between group">
                                <CardContent className="h-full flex flex-col justify-between p-0">
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <h3 className="font-serif text-3xl md:text-4xl text-foreground">{ashram.city}</h3>
                                            <Badge variant="outline" className="border-border text-foreground/60 uppercase text-[9px] tracking-widest">
                                                {ashram.role}
                                            </Badge>
                                        </div>
                                        <p className="font-sans text-base text-foreground/70 leading-relaxed mb-10">
                                            {ashram.desc}
                                        </p>
                                    </div>

                                    <div className="pt-8 border-t border-border/50">
                                        <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-accent uppercase block mb-6">
                                            {content.bookingContactLabel}
                                        </span>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-start gap-3 text-sm text-foreground/80">
                                                <MapPin size={16} className="text-foreground/40 shrink-0 mt-0.5" />
                                                <span>{ashram.address}</span>
                                            </div>
                                            <a href={`tel:${ashram.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
                                                <Phone size={16} className="text-foreground/40" />
                                                {ashram.phone}
                                            </a>
                                            <a href={`mailto:${ashram.email}`} className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
                                                <Mail size={16} className="text-foreground/40" />
                                                {ashram.email}
                                            </a>
                                        </div>

                                        <div className="mt-8 p-4 bg-background border border-border/50 text-xs text-foreground/50 italic">
                                            {content.note}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
