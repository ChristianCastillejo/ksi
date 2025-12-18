import { Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Toaster } from 'sonner';

import { Cormorant_Garamond, DM_Sans, Mukta, Tiro_Devanagari_Hindi } from "next/font/google";

import Header from "@/components/layout/Header";
import SiteFooter from '@/components/layout/SiteFooter';
import "../globals.css";
import type { Metadata, Viewport } from "next";

const fontSerifEn = Cormorant_Garamond({
    variable: "--font-serif",
    style: ["normal", "italic"],
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
});

const fontSansEn = DM_Sans({
    variable: "--font-sans",
    style: ["normal", "italic"],
    weight: ["400", "500", "700"],
    subsets: ["latin"],
});

const fontSerifHi = Tiro_Devanagari_Hindi({
    variable: "--font-serif",
    style: ["normal", "italic"],
    weight: ["400"],
    subsets: ["devanagari"],
});

const fontSansHi = Mukta({
    variable: "--font-sans",
    weight: ["400", "500", "700"],
    subsets: ["devanagari"],
});


export const viewport: Viewport = {
    themeColor: "#de6b48",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://ishwarashram.in"),
    title: {
        template: "%s | Ishwar Ashram Trust",
        default: "Ishwar Ashram Trust | Kashmir Shaivism",
    },
    openGraph: {
        type: "website",
        siteName: "Ishwar Ashram Trust",
    },
    twitter: {
        card: "summary_large_image",
    },
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    const isValidLocale = routing.locales.includes(locale as typeof routing.locales[number]);
    if (!isValidLocale) notFound();

    setRequestLocale(locale);
    const messages = await getMessages();

    const isHindi = locale === 'hi';
    const primarySerif = isHindi ? fontSerifHi : fontSerifEn;
    const primarySans = isHindi ? fontSansHi : fontSansEn;

    return (
        <html lang={locale} className="scroll-smooth">
            <body
                className={`
                    ${primarySerif.variable} 
                    ${primarySans.variable} 
                    font-sans 
                    antialiased
                    min-h-screen
                    flex
                    flex-col
                    bg-background
                    text-foreground
                    selection:bg-accent/20 
                    selection:text-accent
                    ${isHindi ? 'leading-relaxed tracking-wide' : ''}
                `}
            >
                <NextIntlClientProvider messages={messages}>
                    <Suspense fallback={<div className="h-24 w-full bg-background border-b border-border/50" />}>
                        <Header />
                    </Suspense>

                    <main id="main-content" className="flex-1 flex flex-col w-full">
                        {children}
                    </main>

                    <Toaster position="top-right" richColors />

                    <Suspense fallback={<div className="h-48 w-full bg-secondary" />}>
                        <SiteFooter />
                    </Suspense>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}