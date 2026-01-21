import React, { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { FaqContainer } from "./_components/FaqContainer";
import { FaqCategoriesSection } from "./_components/FaqCategoriesSection";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: "Seo" });

    return {
        title: t("faq.title"),
        description: t("faq.description"),
        openGraph: {
            title: t("faq.title"),
            description: t("faq.description"),
        },
    };
}

export default async function FaqPage({ params }: Props): Promise<React.JSX.Element> {
    const { locale } = await params;

    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "Faq" });

    const heroContent = {
        tagline: t("hero.tagline"),
        titleMain: t("hero.titleMain"),
        titleItalic: t("hero.titleItalic"),
        description: t("hero.description"),
    };

    const faqCategoriesContent = {
        navLabel: t("categories.navLabel"),
        navTitleMain: t("categories.navTitleMain"),
        navTitleItalic: t("categories.navTitleItalic"),
        exploreButtonText: t("categories.exploreButtonText"),
        categories: [
            {
                id: "philosophy",
                title: t("categories.philosophy.title"),
                iconId: "helpCircle",
                faqs: [
                    {
                        q: t("categories.philosophy.faq0.q"),
                        a: t("categories.philosophy.faq0.a"),
                    },
                    {
                        q: t("categories.philosophy.faq1.q"),
                        a: t("categories.philosophy.faq1.a"),
                    },
                ],
            },
            {
                id: "storebook",
                title: t("categories.storebook.title"),
                iconId: "bookOpen",
                faqs: [
                    {
                        q: t("categories.storebook.faq0.q"),
                        a: t("categories.storebook.faq0.a"),
                    },
                    {
                        q: t("categories.storebook.faq1.q"),
                        a: t("categories.storebook.faq1.a"),
                    },
                ],
            },
            {
                id: "ashram",
                title: t("categories.ashram.title"),
                iconId: "mapPin",
                faqs: [
                    {
                        q: t("categories.ashram.faq0.q"),
                        a: t("categories.ashram.faq0.a"),
                    },
                    {
                        q: t("categories.ashram.faq1.q"),
                        a: t("categories.ashram.faq1.a"),
                    },
                ],
            },
            {
                id: "digital",
                title: t("categories.digital.title"),
                iconId: "globe",
                faqs: [
                    {
                        q: t("categories.digital.faq0.q"),
                        a: t("categories.digital.faq0.a"),
                    },
                ],
            },
        ],
    };

    return (
        <FaqContainer heroContent={heroContent}>
            <Suspense fallback={<div className="h-screen" />}>
                <FaqCategoriesSection content={faqCategoriesContent} />
            </Suspense>
        </FaqContainer>
    );
}