import { Suspense } from "react";
import { headers } from "next/headers";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import { getTenant, getTenantName, type TenantId } from "@/lib/tenant";
import { Home } from "./_components/Home";
import { routing } from "@/i18n/routing";

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
        title: `${tenantName} | ${t("home.title")}`,

        description: t(`home.description.${tenant}`),

        openGraph: {
            title: tenantName,
            description: t(`home.description.${tenant}`)
        }
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function MultiDomainHomePage({ params }: Props) {
    const { locale } = await params;

    setRequestLocale(locale);

    return (
        <Suspense fallback={<HomeSkeleton />}>
            <TenantRouter locale={locale} />
        </Suspense>
    );
}

async function TenantRouter({ locale }: { locale: string }) {
    const headersList = await headers();
    const domain = headersList.get("host") || "";
    const tenant = getTenant(domain);

    return <Home tenant={tenant} locale={locale} />;
}

function HomeSkeleton() {
    return <div className="w-full min-h-screen bg-background" />;
}