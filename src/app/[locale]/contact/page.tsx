import React, { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import { HeroContact } from "./_components/HeroContact";
import { ContactClient } from "./_components/ContactClient";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "Seo" });

    return {
        title: t("contact.title"),
        description: t("contact.description"),
        openGraph: {
            title: t("contact.title"),
            description: t("contact.description"),
        },
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function ContactPage({ params }: Props): Promise<React.JSX.Element> {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "Contact" });

    const heroContent = {
        titleMain: t("hero.titleMain"),
        titleItalic: t("hero.titleItalic"),
    };

    const clientContent = {
        reachTitleMain: t("reach.titleMain"),
        reachTitleItalic: t("reach.titleItalic"),
        reachDescription: t("reach.description"),
        formTitle: t("form.title"),
        destLabel: t("form.destLabel"),
        destPlaceholder: t("form.destPlaceholder"),
        destError: t("form.destError"),
        nameLabel: t("form.nameLabel"),
        namePlaceholder: t("form.namePlaceholder"),
        emailLabel: t("form.emailLabel"),
        emailPlaceholder: t("form.emailPlaceholder"),
        phoneLabel: t("form.phoneLabel"),
        phonePlaceholder: t("form.phonePlaceholder"),
        subjectLabel: t("form.subjectLabel"),
        subjectPlaceholder: t("form.subjectPlaceholder"),
        messageLabel: t("form.messageLabel"),
        messagePlaceholder: t("form.messagePlaceholder"),
        successTitle: t("form.successTitle"),
        successBtn: t("form.successBtn"),
        submitBtn: t("form.submitBtn"),
        submittingBtn: t("form.submittingBtn"),
        organizations: t.raw("organizations") as {
            id: string;
            name: string;
            tag: string;
            address: string;
            phones: string[];
            email: string;
        }[],
    };

    return (
        <div className="relative w-full min-h-screen bg-background">
            <HeroContact content={heroContent} />
            <Suspense fallback={
                <div className="w-full h-[70vh]" />
            }>
                <ContactClient content={clientContent} />
            </Suspense>
        </div>
    );
}