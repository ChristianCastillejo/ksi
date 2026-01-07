import React, { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { KashmirShaivismContainer } from "./_components/KashmirShaivismContainer";
import { QuoteEssence } from "./_components/QuoteEssence";
import { TheOriginsSection } from "./_components/TheOriginsSection";
import { TheTeachingsIndex } from "./_components/TheTeachingsIndex";
import { PhilosophyCTA } from "./_components/PhilosophyCTA";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: "Seo" });

    return {
        title: t("kashmirShaivism.title"),
        description: t("kashmirShaivism.description"),
        openGraph: {
            title: t("kashmirShaivism.title"),
            description: t("kashmirShaivism.description"),
        },
    };
}

export default async function KashmirShaivismPage({ params }: Props): Promise<React.JSX.Element> {
    const { locale } = await params;

    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "KashmirShaivism" });

    const heroContent = {
        tagline: t("hero.tagline"),
        titleMain: t("hero.titleMain"),
        titleItalic: t("hero.titleItalic"),
        description: t("hero.description"),
    };

    const quoteContent = {
        quote: (
            <>
                &quot;<span>{t("quote.quotePrefix")}</span>
                <span className="italic font-medium text-accent"> {t("quote.reflectionSpan")}</span>
                <span>{t("quote.quoteSuffix")}</span>&quot;
            </>
        ),
        author: t("quote.author"),
    };

    const originsContent = {
        tagline: t("origins.tagline"),
        titleMain: t("origins.titleMain"),
        titleItalic: t("origins.titleItalic"),
        contextDesc: t("origins.contextDesc"),
        contentPart1: (
            <>
                {t("origins.contentPart1Prefix")}<em>{t("origins.contentPart1Em")}</em>{t("origins.contentPart1Suffix")}
            </>
        ),
        contentPart2: (
            <>
                {t("origins.contentPart2Prefix")}<em>{t("origins.contentPart2Em")}</em>{t("origins.contentPart2Middle")}<strong>{t("origins.contentPart2Para")}</strong>{t("origins.contentPart2ParaLabel")}<strong>{t("origins.contentPart2Parapara")}</strong>{t("origins.contentPart2ParaparaLabel")}<strong>{t("origins.contentPart2Apara")}</strong>{t("origins.contentPart2AparaLabel")}
            </>
        ),
        subtitle: t("origins.subtitle"),
        contentPart3: t("origins.contentPart3"),
        contentPart4: (
            <>
                {t("origins.contentPart4Prefix")}<em>{t("origins.contentPart4Em")}</em>{t("origins.contentPart4Middle")}<strong>{t("origins.contentPart4Strong")}</strong>{t("origins.contentPart4Suffix")}
            </>
        ),
    };

    const teachingsContent = {
        title: t("teachings.title"),
        subtitle: t("teachings.subtitle"),
        items: t.raw("teachings.items") as Array<{ id: string; title: string; subtitle: string; desc: string }>,
    };

    const ctaContent = {
        titleMain: t("cta.titleMain"),
        titleItalic: t("cta.titleItalic"),
        p1: t("cta.p1"),
        quote: t("cta.quote"),
        buttonLabel: t("cta.buttonLabel"),
        linkHref: t("cta.linkHref"),
    };

    return (
        <KashmirShaivismContainer heroContent={heroContent}>
            <Suspense fallback={<div className="h-screen" />}>
                <QuoteEssence content={quoteContent} />
                <TheOriginsSection content={originsContent} />
                <TheTeachingsIndex content={teachingsContent} />
                <PhilosophyCTA content={ctaContent} />
            </Suspense>
        </KashmirShaivismContainer>
    );
}