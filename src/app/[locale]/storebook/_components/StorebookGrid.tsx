"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book } from "@/gql/graphql";
import { StorebookClientContent } from "./StorebookClient";

const CONFIG = {
    ANIMATION: { DURATION: { FAST: 0.4 }, EASE: [0.16, 1, 0.3, 1] }
} as const;

interface StorebookGridProps {
    filteredBooks: Book[];
    content: StorebookClientContent;
    onClearFilters: () => void;
}

export const StorebookGrid = ({ filteredBooks, content, onClearFilters }: StorebookGridProps) => {
    return (
        <div className="w-full lg:w-3/4">
            <div className="mb-6 font-sans text-sm text-foreground/50">
                {content.showingPrefix} {filteredBooks.length} {content.showingSuffix}
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                            <motion.div
                                key={book.sys?.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: CONFIG.ANIMATION.DURATION.FAST, ease: CONFIG.ANIMATION.EASE }}
                            >
                                <Link href={`/storebook/${book.slug}`} rel="noopener noreferrer" className="block h-full">
                                    <Card variant="stable" className="h-full flex flex-col border-white/100 border-2 hover:border-primary/10 bg-surface">
                                        <div className="relative w-full aspect-[4/5] bg-muted overflow-hidden rounded-t-[calc(var(--radius-surface)-1px)]">
                                            {book.coverImage?.url && (
                                                <Image
                                                    src={book.coverImage.url}
                                                    alt={book.coverImage.title || book.title || ""}
                                                    fill
                                                    className="object-cover object-top hover:scale-102 transition-transform duration-300 ease-out"
                                                />
                                            )}
                                        </div>
                                        <CardHeader className="flex-none pt-4 pb-2">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant="secondary" className="font-sans text-[9px] uppercase tracking-widest bg-background border-border text-foreground/70">
                                                    {book.difficulty}
                                                </Badge>
                                            </div>
                                            <CardTitle className="font-serif text-lg leading-tight text-foreground line-clamp-2">
                                                {book.title}
                                            </CardTitle>
                                            <CardDescription className="font-sans text-xs text-foreground/60 mt-1">
                                                {book.author}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="mt-auto pt-3 flex flex-col gap-3">
                                            <div className="font-sans text-lg text-foreground font-medium">
                                                {content.currencySymbol} {book.price}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="col-span-full py-24 flex flex-col items-center justify-center text-center border border-border/50 border-dashed rounded-[var(--radius-surface)]"
                        >
                            <BookOpen size={48} className="text-foreground/20 mb-4" />
                            <h3 className="font-serif text-2xl text-foreground mb-2">{content.noTextsFound}</h3>
                            <Button variant="outline" onClick={onClearFilters} className="mt-6">
                                {content.clearFiltersBtn}
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};