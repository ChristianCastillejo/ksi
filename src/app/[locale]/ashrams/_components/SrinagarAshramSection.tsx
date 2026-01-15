"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Play } from "lucide-react";
import Image from "next/image";
import { CONFIG } from "./config";

export interface SrinagarAshramContent {
    tagline: string;
    titleMain: string;
    titleItalic: string;
    p1: string;
    p2: React.ReactNode;
    planTitle: string;
    planDesc: string;
    phoneLabel: string;
    phoneLink: string;
    emailLabel: string;
    caption: string;
}

interface SrinagarAshramSectionProps {
    content: SrinagarAshramContent;
}

export const SrinagarAshramSection = ({ content }: SrinagarAshramSectionProps) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    return (
        <section className="relative w-full py-32 bg-surface px-6 lg:px-16 border-b border-border">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24 items-start">
                <div className="lg:col-span-5 flex flex-col gap-8">
                    <div className="flex items-center gap-3 mb-4">
                        <MapPin size={20} className="text-accent" />
                        <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-accent uppercase">
                            {content.tagline}
                        </span>
                    </div>

                    <h2 className="font-serif text-5xl md:text-6xl text-foreground leading-[1.1]">
                        {content.titleMain} <br />
                        <span className="italic text-foreground/60">{content.titleItalic}</span>
                    </h2>

                    <div className="font-sans text-base text-foreground/80 leading-relaxed flex flex-col gap-6 mt-4">
                        <p>{content.p1}</p>
                        <p>{content.p2}</p>

                        <div className="p-6 bg-background border border-border mt-4">
                            <h4 className="font-serif text-xl mb-4">{content.planTitle}</h4>
                            <p className="font-sans text-sm text-foreground/60 mb-6">
                                {content.planDesc}
                            </p>
                            <div className="flex flex-col gap-3">
                                <a href={`tel:${content.phoneLink}`} className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
                                    <Phone size={14} className="text-accent" /> {content.phoneLabel}
                                </a>
                                <a href={`mailto:${content.emailLabel}`} className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
                                    <Mail size={14} className="text-accent" /> {content.emailLabel}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 flex flex-col gap-6">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL }}
                        className="relative w-full aspect-video bg-muted rounded-[var(--radius-content)] overflow-hidden shadow-2xl border border-border z-10"
                    >
                        {!isVideoPlaying ? (
                            <div
                                onClick={() => setIsVideoPlaying(true)}
                                className="absolute inset-0 w-full h-full cursor-pointer flex items-center justify-center"
                            >
                                <Image
                                    src="/images/ashram/swamiji-house.webp"
                                    alt="Play Virtual Tour"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />

                                <div className="relative z-10 w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                                    <Play size={32} fill="currentColor" className="ml-2" />
                                </div>
                            </div>
                        ) : (
                            <iframe
                                src="https://fast.wistia.net/embed/iframe/0eh89cue89?seo=false&videoFoam=true&playerColor=de6b48&autoPlay=true"
                                title="Ishwar Ashram Virtual Tour"
                                allow="autoplay; fullscreen"
                                allowFullScreen
                                className="w-full h-full"
                                name="wistia_embed"
                            ></iframe>
                        )}
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: CONFIG.ANIMATION.DURATION.NORMAL, delay: 0.2 + (i * 0.1) }}
                                className="relative aspect-[4/3] w-full bg-muted rounded-[var(--radius-content)] overflow-hidden shadow-lg border border-border/50"
                            >
                                <Image
                                    src={`/images/ashram/srinagar-${item}.webp`}
                                    alt="Ishwar Ashram Srinagar grounds"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </motion.div>
                        ))}
                    </div>

                    <p className="font-sans text-[11px] text-foreground/50 uppercase tracking-widest text-center">
                        {content.caption}
                    </p>
                </div>
            </div>
        </section>
    );
};
