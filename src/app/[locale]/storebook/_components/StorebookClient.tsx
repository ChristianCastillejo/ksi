"use client";

import React, { useState, useMemo, use } from "react";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/select";
import { Book } from "@/gql/graphql";
import { StorebookGrid } from "./StorebookGrid";

export interface StorebookClientContent {
    archiveTitle: string;
    diffLabel: string;
    sortLabel: string;
    sortPlaceholder: string;
    sortAZ: string;
    sortZA: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    showingPrefix: string;
    showingSuffix: string;
    noTextsFound: string;
    clearFiltersBtn: string;
    currencySymbol: string;
    langLabel: string;
    difficulties: { value: string; label: string }[];
    languages: { value: string; label: string }[];
}

interface StorebookClientProps {
    booksPromise: Promise<Book[]>;
    content: StorebookClientContent;
}

export const StorebookClient = ({ booksPromise, content }: StorebookClientProps) => {
    const initialBooks = use(booksPromise);

    const [filterLang, setFilterLang] = useState<string>("All");
    const [filterDiff, setFilterDiff] = useState<string>("All");
    const [sortBy, setSortBy] = useState<"A-Z" | "Z-A" | "price-asc" | "price-desc">("A-Z");

    const filteredBooks = useMemo(() => {
        let result = [...initialBooks];

        if (filterLang !== "All") result = result.filter((b) => b.language === filterLang);
        if (filterDiff !== "All") result = result.filter((b) => b.difficulty === filterDiff);

        result.sort((a, b) => {
            if (sortBy === "A-Z" || sortBy === "Z-A") {
                const titleA = a.title ?? "";
                const titleB = b.title ?? "";
                return sortBy === "A-Z" ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
            }
            const priceA = a.price ?? (sortBy === "price-asc" ? Infinity : -Infinity);
            const priceB = b.price ?? (sortBy === "price-asc" ? Infinity : -Infinity);
            return sortBy === "price-asc" ? priceA - priceB : priceB - priceA;
        });
        return result;
    }, [initialBooks, filterLang, filterDiff, sortBy]);

    const handleClearFilters = () => {
        setFilterLang("All");
        setFilterDiff("All");
    };

    return (
        <section className="relative w-full pb-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row gap-12 items-start">

                <div className="w-full lg:w-1/4 lg:sticky lg:top-32 flex flex-col gap-10">
                    <div className="flex items-center gap-2 text-foreground font-serif text-2xl border-b border-border pb-4">
                        <SlidersHorizontal size={20} className="text-accent" />
                        <h3>{content.archiveTitle}</h3>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-accent uppercase">{content.diffLabel}</span>
                        <div className="flex flex-wrap gap-2">
                            {content.difficulties.map(diff => (
                                <button
                                    key={diff.value}
                                    onClick={() => setFilterDiff(diff.value)}
                                    className={cn(
                                        "px-4 py-2 rounded-[var(--radius-interaction)] text-xs font-medium transition-colors border cursor-pointer",
                                        filterDiff === diff.value ? "bg-foreground text-background border-foreground" : "bg-surface text-foreground/70 border-border hover:border-foreground"
                                    )}
                                >
                                    {diff.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-accent uppercase">{content.langLabel}</span>
                        <div className="flex flex-wrap gap-2">
                            {content.languages.map(lang => (
                                <button
                                    key={lang.value}
                                    onClick={() => setFilterLang(lang.value)}
                                    className={cn(
                                        "px-4 py-2 rounded-[var(--radius-interaction)] text-xs font-medium transition-colors border cursor-pointer",
                                        filterLang === lang.value ? "bg-foreground text-background border-foreground" : "bg-surface text-foreground/70 border-border hover:border-foreground"
                                    )}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-accent uppercase">{content.sortLabel}</span>
                        <Select value={sortBy} onValueChange={(value) => setSortBy(value as "A-Z" | "Z-A" | "price-asc" | "price-desc")}>
                            <SelectTrigger>
                                <SelectValue placeholder={content.sortPlaceholder} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="A-Z">{content.sortAZ}</SelectItem>
                                <SelectItem value="Z-A">{content.sortZA}</SelectItem>
                                <SelectItem value="price-asc">{content.sortPriceAsc}</SelectItem>
                                <SelectItem value="price-desc">{content.sortPriceDesc}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <StorebookGrid
                    filteredBooks={filteredBooks}
                    content={content}
                    onClearFilters={handleClearFilters}
                />
            </div>
        </section>
    );
};