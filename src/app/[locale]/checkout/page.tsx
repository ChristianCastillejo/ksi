import React, { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import { CheckoutHero } from "./_components/CheckoutHero";
import { CheckoutClient } from "./_components/CheckoutClient";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
    title: "Secure Checkout",
    robots: {
        index: false,
        follow: false,
        nocache: true,
    },
};

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function CheckoutPage({ params }: Props): Promise<React.JSX.Element> {
    const { locale } = await params;

    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'Checkout' });

    const heroContent = {
        shippingTag: t("hero.shippingTag"),
        titleMain: t("hero.titleMain"),
        titleItalic: t("hero.titleItalic")
    };

    const clientContent = {
        successTitle: t("client.successTitle"),
        successDesc: t("client.successDesc"),
        returnBtn: t("client.returnBtn"),
        emptyTitle: t("client.emptyTitle"),
        emptyDesc: t("client.emptyDesc"),
        exploreBtn: t("client.exploreBtn"),
        manualProcTitle: t("client.manualProcTitle"),
        manualProcDesc: t("client.manualProcDesc"),
        selectedTextsTitle: t("client.selectedTextsTitle"),
        totalLabel: t("client.totalLabel"),
        shippingNote: t("client.shippingNote"),
        outsideIndiaLabel: t("client.outsideIndiaLabel"),
        visitAcademyBtn: t("client.visitAcademyBtn"),
        formTitle: t("client.formTitle"),
        nameLabel: t("client.nameLabel"),
        emailLabel: t("client.emailLabel"),
        phoneLabel: t("client.phoneLabel"),
        phoneNote: t("client.phoneNote"),
        addressLabel: t("client.addressLabel"),
        cityLabel: t("client.cityLabel"),
        stateLabel: t("client.stateLabel"),
        pinLabel: t("client.pinLabel"),
        countryLabel: t("client.countryLabel"),
        countryValue: t("client.countryValue"),
        submitBtn: t("client.submitBtn"),
        submittingBtn: t("client.submittingBtn"),
        currencySymbol: t("client.currencySymbol"),
        intlToastTitle: t("client.intlToastTitle"),
        intlToastDesc: t("client.intlToastDesc"),
        intlToastBtn: t("client.intlToastBtn")
    };

    return (
        <div className="relative w-full min-h-screen bg-background pb-32">
            <CheckoutHero content={heroContent} />

            <Suspense fallback={
                <div className="max-w-7xl mx-auto px-6 lg:px-16 mt-16 w-full h-[600px] bg-surface animate-pulse rounded-[var(--radius-content)]" />
            }>
                <CheckoutClient content={clientContent} />
            </Suspense>
        </div>
    );
}