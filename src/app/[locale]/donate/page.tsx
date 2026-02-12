import React, { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import { HeroDonation } from "./_components/HeroDonation";
import { DonateClient } from "./_components/DonateClient";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "Seo" });

    return {
        title: t("donate.title"),
        description: t("donate.description"),
        openGraph: {
            title: t("donate.title"),
            description: t("donate.description"),
        },
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

const ORGANIZATIONS_STATIC = [
    {
        id: "ksi",
        bank: { name: "Punjab National Bank", accName: "Kashmir Shaiva Institute", accNo: "2219000102488724", ifsc: "PUNB0221900", address: "Canal Road, Jammu (J&K) – 180001" },
        foreignAllowed: true,
    },
    {
        id: "srinagar",
        bank: { name: "The Jammu and Kashmir Bank Ltd", accName: "Ishwar Ashram Trust", accNo: "0252040100009367", ifsc: "JAKA0AIRCAR", address: "Air Cargo Srinagar, Rajbagh Branch – Pin 190008" },
        foreignAllowed: true,
    },
    {
        id: "delhi",
        bank: { name: "HDFC Bank Ltd", accName: "Ishwar Ashram Trust", accNo: "50100437221394", ifsc: "HDFC0000480", address: "H Block Market, Sarita Vihar, New Delhi - 110076" },
        foreignAllowed: false,
    },
];

export default async function DonatePage({ params }: Props): Promise<React.JSX.Element> {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "Donate" });

    const heroContent = {
        tagline: t("hero.tagline"),
        titleMain: t("hero.titleMain"),
        titleItalic: t("hero.titleItalic"),
        description: t("hero.description"),
    };

    const organizations = ORGANIZATIONS_STATIC.map((org) => ({
        ...org,
        shortName: t(`organizations.${org.id}.shortName`),
        fullName: t(`organizations.${org.id}.fullName`),
        desc: t(`organizations.${org.id}.desc`),
        tags: [t(`organizations.${org.id}.tag1`), t(`organizations.${org.id}.tag2`)],
        taxInfo: t(`organizations.${org.id}.taxInfo`),
    }));

    const donateClientContent = {
        organizations,
        bankDetailsTitle: t("client.bankDetailsTitle"),
        accNameLabel: t("client.accNameLabel"),
        accNoLabel: t("client.accNoLabel"),
        bankNameLabel: t("client.bankNameLabel"),
        ifscLabel: t("client.ifscLabel"),
        branchLabel: t("client.branchLabel"),
        taxExemptLabel: t("client.taxExemptLabel"),
        foreignWarning: t("client.foreignWarning"),
        scanUpiLabel: t("client.scanUpiLabel"),
        informUsTitle: t("client.informUsTitle"),
        informUsDesc: t("client.informUsDesc"),
        informUsSteps: [
            t("client.informUsStep1"),
            t("client.informUsStep2"),
            t("client.informUsStep3"),
        ],
        nameLabel: t("client.nameLabel"),
        emailLabel: t("client.emailLabel"),
        phoneLabel: t("client.phoneLabel"),
        panLabel: t("client.panLabel"),
        utrLabel: t("client.utrLabel"),
        amountLabel: t("client.amountLabel"),
        addressLabel: t("client.addressLabel"),
        uploadLabel: t("client.uploadLabel"),
        uploadDesc: t("client.uploadDesc"),
        uploadLimits: t("client.uploadLimits"),
        submitBtn: t("client.submitBtn"),
        submittingBtn: t("client.submittingBtn"),
        successTitle: t("client.successTitle"),
        successBtn: t("client.successBtn"),
    };

    return (
        <div className="relative w-full min-h-screen bg-background pb-32">
            <HeroDonation content={heroContent} />
            <Suspense fallback={
                <div className="w-full h-[70vh]" />
            }>
                <DonateClient content={donateClientContent} />
            </Suspense>
        </div>
    );
}