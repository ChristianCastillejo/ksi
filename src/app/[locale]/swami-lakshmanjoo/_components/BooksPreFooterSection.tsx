"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

interface BooksContent {
    tagline: string;
    titleMain: string;
    titleItalic: string;
    description: string;
    buttonLabel: string;
    buttonLink: string;
    mainBookAlt: string;
    secondaryBookAlt: string;
    sealAlt: string;
}

export const BooksPreFooterSection = ({ content }: { content: BooksContent }) => {
    return (
        <section className="relative w-full py-32 lg:py-48 bg-secondary overflow-hidden flex justify-center px-6">

            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

                <div className="flex flex-col items-start order-2 lg:order-1">
                    <div className="flex items-center gap-3 mb-8">
                        <BookOpen size={20} className="text-accent" strokeWidth={1.5} />
                        <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-accent uppercase">
                            {content.tagline}
                        </span>
                    </div>

                    <h2 className="font-serif text-5xl md:text-6xl text-background leading-[1.1] mb-8">
                        {content.titleMain} <br />
                        <span className="italic text-background/80">{content.titleItalic}</span>
                    </h2>

                    <p className="font-sans text-base md:text-lg text-background/60 leading-relaxed mb-12 max-w-md">
                        {content.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                        <Button asChild size="lg" className="uppercase tracking-widest group">
                            <Link href={content.buttonLink} className="flex items-center gap-2">
                                {content.buttonLabel} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="relative h-[400px] md:h-[500px] w-full order-1 lg:order-2">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-20%" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full h-full flex items-center justify-center lg:justify-end"
                    >
                        <div className="relative z-20 w-[200px] md:w-[260px] aspect-[2/3] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-6 group hover:rotate-0 transition-transform duration-700 ease-out">
                            <Image
                                src="/images/books/the-secret-supreme.webp"
                                alt={content.mainBookAlt}
                                fill
                                className="object-cover rounded-sm"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        </div>

                        <div className="absolute z-10 w-[180px] md:w-[220px] aspect-[2/3] shadow-2xl transform rotate-12 translate-x-12 translate-y-12 md:translate-x-24 md:translate-y-8 opacity-70 blur-[2px]">
                            <Image
                                src="/images/books/siva-sutras.webp"
                                alt={content.secondaryBookAlt}
                                fill
                                className="object-cover rounded-sm grayscale-[0.3]"
                            />
                        </div>

                        <div className="absolute -bottom-10 -right-10 md:bottom-10 md:right-10 w-32 h-32 opacity-10 rotate-12 pointer-events-none">
                            <Image
                                src="/images/om-symbol-or-seal.png"
                                alt={content.sealAlt}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};
