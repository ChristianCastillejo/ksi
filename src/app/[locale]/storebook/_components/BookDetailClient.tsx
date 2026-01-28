"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Globe, BarChart, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Book } from "@/gql/graphql";
import { AddToCart, AddToCartContent } from "./AddToCart";

export interface BookDetailContent {
    backToBookstore: string;
    byAuthorLabel: string;
    notAvailable: string;
    descriptionFallback: string;
    techSpecsTitle: string;
    languageLabel: string;
    levelLabel: string;
    formatLabel: string;
    hardcoverLabel: string;
    currencySymbol: string;
    addToCartContent: AddToCartContent;
}

interface BookDetailClientProps {
    book: Book;
    content: BookDetailContent;
}

export const BookDetailClient = ({ book, content }: BookDetailClientProps) => {

    const cartBookData = {
        sys: { id: book.sys?.id ?? "" },
        title: book.title ?? "",
        price: typeof book.price === 'number'
            ? book.price
            : parseFloat(String(book.price ?? "0").replace(/[^0-9.]/g, '')),
        stock: book.stock ?? 10,
        coverImage: { url: book.coverImage?.url ?? "" }
    };

    return (
        <div className="relative min-h-screen bg-background pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-8">
                <Link href="/storebook" className="group inline-flex items-center gap-2 text-foreground/50 hover:text-accent transition-colors font-sans text-sm tracking-widest uppercase">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    {content.backToBookstore}
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    <div className="lg:col-span-5">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:sticky lg:top-32">
                            <div className="relative aspect-[3/4] w-full rounded-[var(--radius-content)] overflow-hidden group">
                                <Image
                                    src={book.coverImage?.url || "/placeholder-book.jpg"}
                                    alt={book.title || "Book Cover"}
                                    fill
                                    priority
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            <div className="mt-8 md:hidden">
                                <AddToCart book={cartBookData} content={content.addToCartContent} />
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-7 flex flex-col">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <div className="flex flex-wrap gap-3 mb-6">
                                <Badge variant="outline" className="border-accent/30 text-accent uppercase tracking-[0.2em] text-[10px] px-3">
                                    {book.difficulty || content.notAvailable}
                                </Badge>
                                <Badge variant="secondary" className="bg-surface text-foreground/60 font-sans text-[10px] uppercase tracking-widest">
                                    {book.language || content.notAvailable}
                                </Badge>
                            </div>

                            <h1 className="font-serif text-4xl md:text-6xl text-foreground leading-tight mb-4">
                                {book.title}
                            </h1>

                            <p className="font-sans text-xl text-foreground/50 italic mb-8">
                                {content.byAuthorLabel} {book.author || "Swami Lakshmanjoo"}
                            </p>

                            <div className="hidden md:block my-12">
                                <div className="text-3xl font-serif text-foreground mb-2">{content.currencySymbol} {book.price}</div>
                                <AddToCart book={cartBookData} content={content.addToCartContent} />
                            </div>

                            <div className="h-px w-full bg-border/60 mb-8" />

                            <div className="prose prose-stone prose-invert max-w-none">
                                <p className="font-sans text-lg text-foreground/80 leading-relaxed">
                                    {book.description || content.descriptionFallback}
                                </p>
                            </div>

                            <div className="mt-12">
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="details" className="border-border/60">
                                        <AccordionTrigger className="font-sans text-xs uppercase tracking-widest hover:no-underline">
                                            {content.techSpecsTitle}
                                        </AccordionTrigger>
                                        <AccordionContent className="pt-4 pb-8">
                                            <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                                                <SpecItem icon={<Globe size={14} />} label={content.languageLabel} value={book.language || content.notAvailable} />
                                                <SpecItem icon={<BarChart size={14} />} label={content.levelLabel} value={book.difficulty || content.notAvailable} />
                                                <SpecItem icon={<ChevronRight size={14} />} label={content.formatLabel} value={content.hardcoverLabel} />
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SpecItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-accent/60 uppercase text-[9px] font-bold tracking-tighter">
            {icon} {label}
        </div>
        <div className="font-sans text-sm text-foreground/80">{value}</div>
    </div>
);