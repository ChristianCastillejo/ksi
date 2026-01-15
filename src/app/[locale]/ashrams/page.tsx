import React, { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { AshramsContainer } from "./_components/AshramsContainer";
import { SrinagarAshramSection } from "./_components/SrinagarAshramSection";
import { OtherAshramsSection } from "./_components/OtherAshramsSection";
import { AshramActivitiesSection } from "./_components/AshramActivitiesSection";
import { CommunitySection } from "./_components/CommunitySection";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "Seo" });

    return {
        title: t("ashrams.title"),
        description: t("ashrams.description"),
        openGraph: {
            title: t("ashrams.title"),
            description: t("ashrams.description"),
        },
    };
}

export default async function AshramsPage({ params }: Props): Promise<React.JSX.Element> {
    const { locale } = await params;

    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "Ashrams" });

    const heroContent = {
        tagline: t("hero.tagline"),
        titleMain: t("hero.titleMain"),
        titleItalic: t("hero.titleItalic"),
        description: t("hero.description"),
    };

    const srinagarContent = {
        tagline: t("srinagar.tagline"),
        titleMain: t("srinagar.titleMain"),
        titleItalic: t("srinagar.titleItalic"),
        p1: t("srinagar.p1"),
        p2: (
            <>
                {t("srinagar.p2Prefix")}<em>{t("srinagar.p2Italic")}</em>{t("srinagar.p2Suffix")}
            </>
        ),
        planTitle: t("srinagar.planTitle"),
        planDesc: t("srinagar.planDesc"),
        phoneLabel: t("srinagar.phoneLabel"),
        phoneLink: t("srinagar.phoneLink"),
        emailLabel: t("srinagar.emailLabel"),
        caption: t("srinagar.caption"),
    };

    const otherAshramsContent = {
        title: t("otherAshrams.title"),
        subtitle: t("otherAshrams.subtitle"),
        bookingContactLabel: t("otherAshrams.bookingContactLabel"),
        note: t("otherAshrams.note"),
        items: [
            {
                city: t("otherAshrams.items.0.city"),
                role: t("otherAshrams.items.0.role"),
                desc: t("otherAshrams.items.0.desc"),
                phone: t("otherAshrams.items.0.phone"),
                email: t("otherAshrams.items.0.email"),
                address: t("otherAshrams.items.0.address"),
            },
            {
                city: t("otherAshrams.items.1.city"),
                role: t("otherAshrams.items.1.role"),
                desc: t("otherAshrams.items.1.desc"),
                phone: t("otherAshrams.items.1.phone"),
                email: t("otherAshrams.items.1.email"),
                address: t("otherAshrams.items.1.address"),
            },
        ],
    };


    const sharedActivitiesContent = {
        tagline: t("activities.tagline"),
        titleMain: t("activities.titleMain"),
        titleItalic: t("activities.titleItalic"),
        description: t("activities.description"),
        items: t.raw("activities.items")
    };

    const communityContent = {
        title: t("community.title"),
        description: t("community.description"),
        buttonLabel: t("community.buttonLabel"),
        facebookLink: t("community.facebookLink"),
    };

    return (
        <AshramsContainer heroContent={heroContent}>
            <Suspense fallback={<div className="h-screen" />}>
                <SrinagarAshramSection content={srinagarContent} />
                <OtherAshramsSection content={otherAshramsContent} />
                <AshramActivitiesSection content={sharedActivitiesContent} />
                <CommunitySection content={communityContent} />
            </Suspense>
        </AshramsContainer>
    );
}