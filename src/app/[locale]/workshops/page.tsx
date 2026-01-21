import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import { HeroSection } from "./_components/HeroSection";
import { EssenceOfProgramsSection } from "./_components/EssenceOfProgramsSection";
import { ProgramContent } from "./_components/ProgramContent";

import { fetchContentfulWorkshop } from "@/lib/contentful/client";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "Seo" });

    return {
        title: t("workshops.title"),
        description: t("workshops.description"),
        openGraph: {
            title: t("workshops.title"),
            description: t("workshops.description"),
        },
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function WorkshopsPage({ params }: Props): Promise<React.JSX.Element> {
    const { locale } = await params;

    setRequestLocale(locale);

    const workshopPromise = fetchContentfulWorkshop();

    const t = await getTranslations({ locale, namespace: "Workshops" });

    const heroContent = {
        taglineUpcoming: t("hero.taglineUpcoming"),
        taglineDefault: t("hero.taglineDefault"),
        titleUpcomingLine1: t("hero.titleUpcomingLine1"),
        titleUpcomingLine2Italic: t("hero.titleUpcomingLine2Italic"),
        titleDefaultLine1: t("hero.titleDefaultLine1"),
        titleDefaultLine2Italic: t("hero.titleDefaultLine2Italic"),
        descUpcoming: t("hero.descUpcoming"),
        descDefault: t("hero.descDefault"),
    };

    const essenceContent = {
        tagline: t("essence.tagline"),
        titleMain: t("essence.titleMain"),
        titleItalic: t("essence.titleItalic"),
        dropCap: t("essence.dropCap"),
        paragraph: t("essence.paragraph"),
        feature1Title: t("essence.feature1Title"),
        feature1Desc: t("essence.feature1Desc"),
        feature2Title: t("essence.feature2Title"),
        feature2Desc: t("essence.feature2Desc"),
    };

    const activeProgramContent = {
        aboutTitle: t("activeProgram.aboutTitle"),
        keyElementsTitle: t("activeProgram.keyElementsTitle"),
        facultyTitle: t("activeProgram.facultyTitle"),
        registrationTitle: t("activeProgram.registrationTitle"),
        includesNote: t("activeProgram.includesNote"),
        registerButton: t("activeProgram.registerButton"),
        brochureButton: t("activeProgram.brochureButton"),
        currencySymbol: t("activeProgram.currencySymbol"),
    };

    const waitlistContent = {
        title: t("waitlist.title"),
        description: t("waitlist.description"),
        buttonLabel: t("waitlist.buttonLabel"),
    };

    return (
        <div className="relative w-full">
            <Suspense fallback={<div className="h-screen bg-secondary w-full animate-pulse" />}>
                <HeroSection promise={workshopPromise} content={heroContent} />
            </Suspense>

            <EssenceOfProgramsSection content={essenceContent} />

            <Suspense fallback={<div className="h-96 flex items-center justify-center bg-surface animate-pulse" />}>
                <ProgramContent
                    promise={workshopPromise}
                    activeProgramContent={activeProgramContent}
                    waitlistContent={waitlistContent}
                />
            </Suspense>
        </div>
    );
}