import React, { Suspense } from "react";
import { headers } from "next/headers";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getTenant, getTenantName } from "@/lib/tenant";
import KsiAbout from "./_components/domain/KsiAbout";
import SrinagarAbout from "./_components/domain/SrinagarAbout";
import DelhiAbout from "./_components/domain/DelhiAbout";
import { routing } from "@/i18n/routing";

import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "Seo" });

    const headersList = await headers();
    const domain = headersList.get("host") || "";
    const tenant = getTenant(domain);
    const tenantName = getTenantName(tenant);

    return {
        title: `${tenantName} | ${t("about.title")}`,
        description: t("about.description"),
        openGraph: { title: tenantName, description: t("about.description") }
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function MultiDomainAboutPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <Suspense fallback={<AboutSkeleton />}>
            <TenantAboutRouter locale={locale} />
        </Suspense>
    );
}

async function TenantAboutRouter({ locale }: { locale: string }) {
    const headersList = await headers();
    const domain = headersList.get("host") || "";
    const tenant = getTenant(domain);

    const t = await getTranslations({ locale, namespace: "About" });
    const tAshrams = await getTranslations({ locale, namespace: "Ashrams.activities" });


    const footerContent = {
        tagline: t("sharedFooter.tagline"),
        titleMain: t("sharedFooter.titleMain"),
        titleItalic: t("sharedFooter.titleItalic"),
        cards: [
            { id: "study", num: t("sharedFooter.cards.study.num"), tag: t("sharedFooter.cards.study.tag"), title: t("sharedFooter.cards.study.title"), desc: t("sharedFooter.cards.study.desc"), href: "/storebook", iconId: "book", ctaText: t("sharedFooter.cards.study.ctaText") },
            { id: "support", num: t("sharedFooter.cards.support.num"), tag: t("sharedFooter.cards.support.tag"), title: t("sharedFooter.cards.support.title"), desc: t("sharedFooter.cards.support.desc"), href: "/donate", iconId: "heart", ctaText: t("sharedFooter.cards.support.ctaText") }
        ]
    };

    const sharedActivitiesContent = {
        tagline: tAshrams("tagline"),
        titleMain: tAshrams("titleMain"),
        titleItalic: tAshrams("titleItalic"),
        description: tAshrams("description"),
        items: tAshrams.raw("items")
    };

    if (tenant === "ksi") {
        const ksiContent = {
            hero: { tag: t("ksi.hero.tag"), title: t("ksi.hero.title"), italicTitle: t("ksi.hero.italicTitle"), description: t("ksi.hero.description") },
            trikaTitle: t("ksi.trikaTitle"),
            trikaDesc: (
                <>
                    {t("ksi.trikaDescPre")}<span className="text-foreground font-medium">{t("ksi.trikaDescPara")}</span>{t("ksi.trikaDescParaLabel")}<span className="text-foreground font-medium">{t("ksi.trikaDescApara")}</span>{t("ksi.trikaDescAparaLabel")}<span className="text-foreground font-medium">{t("ksi.trikaDescParapara")}</span>{t("ksi.trikaDescParaparaLabel")}
                </>
            ),
            divineTag: t("ksi.divineTag"),
            divineQuote: t("ksi.divineQuote"),
            kstsTitle: t("ksi.kstsTitle"),
            kstsDesc1: t("ksi.kstsDesc1"),
            kstsDesc2: t("ksi.kstsDesc2"),
            lineageTag: t("ksi.lineageTag"),
            lineageTitle: t("ksi.lineageTitle"),
            masters: t.raw("ksi.masters") as { period: string; name: string; work: string }[],
            footer: footerContent,
            activities: sharedActivitiesContent

        };
        return <KsiAbout content={ksiContent} />;
    }

    if (tenant === "delhi") {
        const delhiContent = {
            hero: { tag: t("delhi.hero.tag"), title: t("delhi.hero.title"), italicTitle: t("delhi.hero.italicTitle"), description: t("delhi.hero.description") },
            bridgeTitle: t("delhi.bridgeTitle"),
            bridgeDesc: t("delhi.bridgeDesc"),
            studyTitle: t("delhi.studyTitle"),
            studyDesc: t("delhi.studyDesc"),
            globalTitle: t("delhi.globalTitle"),
            globalDesc: t("delhi.globalDesc"),
            footer: footerContent,
            activities: sharedActivitiesContent

        };
        return <DelhiAbout content={delhiContent} />;
    }

    const srinagarContent = {
        hero: { tag: t("srinagar.hero.tag"), title: t("srinagar.hero.title"), italicTitle: t("srinagar.hero.italicTitle"), description: t("srinagar.hero.description") },
        estTitlePrefix: t("srinagar.estTitlePrefix"),
        estYear: t("srinagar.estYear"),
        p1: t("srinagar.p1"),
        p2: t("srinagar.p2"),
        footer: footerContent,
        activities: sharedActivitiesContent

    };
    return <SrinagarAbout content={srinagarContent} />;
}

function AboutSkeleton() {
    return <div className="w-full min-h-screen bg-background" />;
}