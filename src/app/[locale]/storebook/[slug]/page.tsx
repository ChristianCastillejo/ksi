import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { fetchContentfulBookBySlug } from "@/lib/contentful/client";
import { Suspense } from "react";

import type { Metadata, ResolvingMetadata } from "next";
import { BookSkeleton } from "../_components/BookSkeleton";
import { BookDetailClient } from "../_components/BookDetailClient";
import { getTranslations } from "next-intl/server";

type PageProps = { params: Promise<{ slug: string; locale: string }> };

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
    const { slug } = await params;
    const book = await fetchContentfulBookBySlug(slug);

    if (!book) {
        return { title: "Book Not Found" };
    }

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: book.title,
        description: book.excerpt || book.subtitle,
        openGraph: {
            title: book.title,
            description: book.excerpt || book.subtitle,
            type: "book",
            authors: ["Swami Lakshmanjoo"],
            images: book.coverImage ? [book.coverImage, ...previousImages] : previousImages,
        },
        twitter: {
            card: "summary_large_image",
            images: book.coverImage ? [book.coverImage] : [],
        }
    };
}

export default function BookPage({ params }: PageProps) {
    return (
        <Suspense fallback={<BookSkeleton />}>
            <BookPayload params={params} />
        </Suspense>
    );
}

async function BookPayload({ params }: PageProps) {
    const { slug, locale } = await params;

    setRequestLocale(locale);

    const book = await fetchContentfulBookBySlug(slug);

    if (!book) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: "Product" });

    const bookContent = {
        backToBookstore: t("backToBookstore"),
        byAuthorLabel: t("byAuthorLabel"),
        notAvailable: t("notAvailable"),
        descriptionFallback: t("descriptionFallback"),
        techSpecsTitle: t("techSpecsTitle"),
        languageLabel: t("languageLabel"),
        levelLabel: t("levelLabel"),
        formatLabel: t("formatLabel"),
        hardcoverLabel: t("hardcoverLabel"),
        currencySymbol: t("currencySymbol"),
        addToCartContent: {
            decreaseAria: t("addToCart.decreaseAria"),
            increaseAria: t("addToCart.increaseAria"),
            addToCartBtn: t("addToCart.addToCartBtn"),
            maxQuantityErrorPrefix: t("addToCart.maxQuantityErrorPrefix"),
            maxQuantityErrorSuffix: t("addToCart.maxQuantityErrorSuffix"),
        }
    };

    return <BookDetailClient book={book} content={bookContent} />;
}