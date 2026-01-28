import React, { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import { fetchContentfulBooks } from "@/lib/contentful/client";
import { StorebookClient } from "./_components/StorebookClient";
import { StorebookHero } from "./_components/StorebookHero";
import { BooksSkeleton } from "./_components/BooksSkeleton";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "Seo" });

    return {
        title: t("storebook.title"),
        description: t("storebook.description"),
        openGraph: {
            title: t("storebook.title"),
            description: t("storebook.description"),
        },
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function StorebookPage({ params }: Props): Promise<React.JSX.Element> {
    const { locale } = await params;

    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "Storebook" });

    const booksPromise = fetchContentfulBooks();

    const heroContent = {
        tagline: t("hero.tagline"),
        titleMain: t("hero.titleMain"),
        titleItalic: t("hero.titleItalic"),
        description: t("hero.description"),
    };

    const clientContent = {
        archiveTitle: t("client.archiveTitle"),
        diffLabel: t("client.diffLabel"),
        langLabel: t("client.langLabel"),
        sortLabel: t("client.sortLabel"),
        sortPlaceholder: t("client.sortPlaceholder"),
        sortAZ: t("client.sortAZ"),
        sortZA: t("client.sortZA"),
        sortPriceAsc: t("client.sortPriceAsc"),
        sortPriceDesc: t("client.sortPriceDesc"),
        showingPrefix: t("client.showingPrefix"),
        showingSuffix: t("client.showingSuffix"),
        noTextsFound: t("client.noTextsFound"),
        clearFiltersBtn: t("client.clearFiltersBtn"),
        currencySymbol: t("client.currencySymbol"),
        difficulties: [
            { value: "All", label: t("client.difficultyAll") },
            { value: "Essential", label: t("client.difficultyEssential") },
            { value: "Intermediate", label: t("client.difficultyIntermediate") },
            { value: "Advanced", label: t("client.difficultyAdvanced") },
        ],
        languages: [
            { value: "All", label: t("client.languageAll") },
            { value: "English", label: t("client.languageEnglish") },
            { value: "Hindi", label: t("client.languageHindi") },
        ],
    };

    return (
        <div className="relative w-full min-h-screen bg-background">
            <StorebookHero content={heroContent} />

            <Suspense fallback={<BooksSkeleton />}>
                <StorebookClient
                    booksPromise={booksPromise}
                    content={clientContent}
                />
            </Suspense>
        </div>
    );
}