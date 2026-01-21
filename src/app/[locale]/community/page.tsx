import React, { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { CommunityContainer } from "./_components/CommunityContainer";
import { PartnershipContext } from "./_components/PartnershipContext";
import { ExternalResourcesGrid } from "./_components/ExternalResourcesGrid";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: "Seo" });

    return {
        title: t("community.title"),
        description: t("community.description"),
        openGraph: {
            title: t("community.title"),
            description: t("community.description"),
        },
    };
}

export default async function OnlineCommunityPage({ params }: Props): Promise<React.JSX.Element> {
    const { locale } = await params;

    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "Community" });

    const heroContent = {
        tagline: t("hero.tagline"),
        titleMain: t("hero.titleMain"),
        titleItalic: t("hero.titleItalic"),
        description: t("hero.description")
    };

    const partnershipContent = {
        titleMain: t("partnership.titleMain"),
        titleItalic: t("partnership.titleItalic"),
        description: t("partnership.description")
    };

    const externalResourcesContent = {
        resources: [
            {
                id: "sangha",
                iconId: "users",
                title: t("externalResources.sangha.title"),
                tag: t("externalResources.sangha.tag"),
                desc: t("externalResources.sangha.desc"),
                url: "https://www.lakshmanjooacademy.org/free-weekly-sangha#gsc.tab=0",
                cta: t("externalResources.sangha.cta")
            },
            {
                id: "puja",
                iconId: "flame",
                title: t("externalResources.puja.title"),
                tag: t("externalResources.puja.tag"),
                desc: t("externalResources.puja.desc"),
                url: "https://www.lakshmanjooacademy.org/free-weekly-puja#gsc.tab=0",
                cta: t("externalResources.puja.cta")
            },
            {
                id: "blog",
                iconId: "book",
                title: t("externalResources.blog.title"),
                tag: t("externalResources.blog.tag"),
                desc: t("externalResources.blog.desc"),
                url: "https://www.lakshmanjooacademy.org/blog#gsc.tab=0",
                cta: t("externalResources.blog.cta")
            }
        ]
    };

    return (
        <CommunityContainer heroContent={heroContent}>
            <Suspense fallback={<div className="h-screen" />}>
                <PartnershipContext content={partnershipContent} />
                <ExternalResourcesGrid content={externalResourcesContent} />
            </Suspense>
        </CommunityContainer>
    );
}