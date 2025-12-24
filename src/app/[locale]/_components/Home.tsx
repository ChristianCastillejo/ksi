import React from "react";
import { Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { type TenantId } from "@/lib/tenant";

import { BentoNavigation } from "./BentoNavigation";
import { HomeFooterCTA } from "./HomeFooterCTA";
import { HomeHero } from "./HomeHero";
import { ManifestoText } from "./ManifestoText";
import { EcosystemSection } from "./EcosystemSection";

export async function Home({ tenant, locale }: { tenant: TenantId; locale: string }) {
    const t = await getTranslations({ locale, namespace: "Home" });

    const heroContent = {
        tagline: t(`hero.${tenant}.tagline`),
        titleLine1: t(`hero.${tenant}.titleLine1`),
        titleLine2: t(`hero.${tenant}.titleLine2`),
        description: t(`hero.${tenant}.description`),
        imageSrc: t(`hero.${tenant}.imageSrc`),
        imageAlt: t(`hero.${tenant}.imageAlt`),
        buttons: {
            kashmirShaivism: t(`hero.buttons.kashmirShaivism`),
            swamiLakshmanjoo: t(`hero.buttons.swamiLakshmanjoo`)
        }
    };

    const manifestoContent = {
        prefix: t(`manifesto.${tenant}.prefix`),
        highlight: t(`manifesto.${tenant}.highlight`),
        suffix: t(`manifesto.${tenant}.suffix`)
    };

    const bentoContent = {
        tagline: t("bento.tagline"),
        titleMain: t("bento.titleMain"),
        titleItalic: t("bento.titleItalic"),
        description: t("bento.description"),
        exploreLabel: t("bento.exploreLabel"),
        pathways: t.raw("bento.pathways") as {
            id: string;
            num: string;
            tag: string;
            title: string;
            desc: string;
            href: string;
            iconId: string;
        }[]
    };

    const ecosystemContent = {
        tagline: t("ecosystem.tagline"),
        titleMain: t("ecosystem.titleMain"),
        titleItalic: t("ecosystem.titleItalic"),
        btnLabel: t("ecosystem.btnLabel"),
        currentBadge: t("ecosystem.currentBadge"),
        centers: t.raw("ecosystem.centers") as {
            id: string;
            name: string;
            role: string;
            desc: string;
            url: string;
            cta: string;
        }[]
    };

    const footerContent = {
        title: t("footer.title"),
        faqBtn: t("footer.faqBtn"),
        contactBtn: t("footer.contactBtn")
    };

    return (
        <div className="relative w-full bg-background">
            <HomeHero content={heroContent} />

            <section className="relative w-full py-32 bg-white px-6 lg:px-16 flex justify-center text-center border-b border-border">
                <div className="max-w-4xl flex flex-col items-center">
                    <Sparkles size={24} className="text-accent mb-8" strokeWidth={1.5} />
                    <ManifestoText content={manifestoContent} />
                </div>
            </section>

            <BentoNavigation content={bentoContent} />
            <EcosystemSection currentTenant={tenant} content={ecosystemContent} />
            <HomeFooterCTA content={footerContent} />
        </div>
    );
}