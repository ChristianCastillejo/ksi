import React, { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { SwamiLakshmanjooContainer } from "./_components/SwamiLakshmanjooContainer";
import { QuoteSection } from "./_components/QuoteSection";
import { BiographySection } from "./_components/BiographySection";
import { TimelineSection } from "./_components/TimelineSection";
import { BooksPreFooterSection } from "./_components/BooksPreFooterSection";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "Seo" });

    return {
        title: t("swamiLakshmanjoo.title"),
        description: t("swamiLakshmanjoo.description"),
        openGraph: {
            title: t("swamiLakshmanjoo.title"),
            description: t("swamiLakshmanjoo.description"),
        },
    };
}

export default async function SwamiLakshmanjooPage({ params }: Props): Promise<React.JSX.Element> {
    const { locale } = await params;

    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "SwamiLakshmanjoo" });

    const heroContent = {
        tagline: t("hero.tagline"),
        titleMain: t("hero.titleMain"),
        titleItalic: t("hero.titleItalic"),
        description: t("hero.description"),
        imageAlt: t("hero.imageAlt"),
        archiveLabel: t("hero.archiveLabel")
    };

    const quoteContent = {
        textMain: t("quote.textMain"),
        textItalic: t("quote.textItalic"),
        textEnd: t("quote.textEnd")
    };

    const biographyContent = {
        titleMain: t("biography.titleMain"),
        titleItalic: t("biography.titleItalic"),
        paragraphs: [
            <React.Fragment key="1">
                {t.rich("biography.p1", {
                    em: (chunks) => <em className="italic text-foreground/80">{chunks}</em>
                })}
            </React.Fragment>, <React.Fragment key="2">
                {t.rich("biography.p2", {
                    em: (chunks) => <em className="italic text-foreground/80">{chunks}</em>
                })}
            </React.Fragment>, <React.Fragment key="3">
                {t.rich("biography.p3", {
                    em: (chunks) => <em className="italic text-foreground/80">{chunks}</em>
                })}
            </React.Fragment>
        ],
        buttonLabel: t("biography.buttonLabel"),
        buttonLink: t("biography.buttonLink")
    };

    const timelineContent = {
        title: t("timeline.title"),
        tagline: t("timeline.tagline"),
        items: [
            { year: t("timeline.items.0.year"), title: t("timeline.items.0.title"), description: t("timeline.items.0.description") },
            { year: t("timeline.items.1.year"), title: t("timeline.items.1.title"), description: t("timeline.items.1.description") },
            { year: t("timeline.items.2.year"), title: t("timeline.items.2.title"), description: t("timeline.items.2.description") },
            { year: t("timeline.items.3.year"), title: t("timeline.items.3.title"), description: t("timeline.items.3.description") },
            { year: t("timeline.items.4.year"), title: t("timeline.items.4.title"), description: t("timeline.items.4.description") }
        ]
    };

    const booksContent = {
        tagline: t("books.tagline"),
        titleMain: t("books.titleMain"),
        titleItalic: t("books.titleItalic"),
        description: t("books.description"),
        buttonLabel: t("books.buttonLabel"),
        buttonLink: t("books.buttonLink"),
        mainBookAlt: t("books.mainBookAlt"),
        secondaryBookAlt: t("books.secondaryBookAlt"),
        sealAlt: t("books.sealAlt")
    };

    return (
        <SwamiLakshmanjooContainer heroContent={heroContent}>
            <Suspense fallback={<div className="h-screen" />}>
                <QuoteSection content={quoteContent} />
                <BiographySection content={biographyContent} />
                <TimelineSection content={timelineContent} />
                <BooksPreFooterSection content={booksContent} />
            </Suspense>
        </SwamiLakshmanjooContainer>
    );
}