"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import type { NavMenuItemConfig } from "@/components/layout/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
    open: boolean;
    closeMenu: () => void;
    menu: NavMenuItemConfig[];
}

export default function MobileMenu({ open, closeMenu, menu }: MobileMenuProps): React.JSX.Element {
    const t = useTranslations("Header");
    const [navStack, setNavStack] = useState<NavMenuItemConfig[]>([]);

    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const isEnglish = locale === "en";

    useEffect(() => {
        if (!open) {
            const timer = setTimeout(() => setNavStack([]), 300);
            return () => clearTimeout(timer);
        }
    }, [open]);

    const currentItems = navStack.length > 0
        ? navStack[navStack.length - 1].items || []
        : menu;

    const currentTitle = navStack.length > 0
        ? t(navStack[navStack.length - 1].titleKey as Parameters<typeof t>[0])
        : t("mobileMenu.menuFallbackTitle");

    const handlePush = (item: NavMenuItemConfig) => setNavStack([...navStack, item]);
    const handlePop = () => setNavStack(navStack.slice(0, -1));

    return (
        <Sheet open={open} onOpenChange={(val) => !val && closeMenu()}>
            <SheetContent
                side="right"
                className="w-full sm:max-w-md p-0 border-l border-border bg-background"
            >
                <SheetTitle className="sr-only">{t("mobileMenu.srTitle")}</SheetTitle>

                <div className="flex flex-col h-full">

                    <div className="flex items-center justify-between px-8 py-6 border-b border-border/50">
                        {navStack.length > 0 ? (
                            <button
                                onClick={handlePop}
                                className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-foreground/60 hover:text-primary transition-colors"
                            >
                                <ArrowLeft size={16} strokeWidth={1.5} />
                                {t("mobileMenu.backBtn")}
                            </button>
                        ) : (
                            <span className="text-[11px] uppercase tracking-widest text-foreground/40 font-medium">
                                {t("mobileMenu.navigationLabel")}
                            </span>
                        )}

                        <button
                            onClick={closeMenu}
                            className="text-foreground hover:text-primary transition-transform hover:rotate-90 duration-300"
                            aria-label={t("mobileMenu.ariaLabels.closeMenu")}
                        >
                            <X strokeWidth={1} size={32} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-hidden relative">
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.div
                                key={navStack.length}
                                initial={{ x: navStack.length === 0 ? 0 : "20%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "-20%", opacity: 0 }}
                                transition={{ type: "spring", stiffness: 250, damping: 30 }}
                                className="absolute inset-0 overflow-y-auto px-8 py-10"
                            >
                                {navStack.length > 0 && (
                                    <h2 className="font-serif italic text-2xl text-foreground/50 mb-8 border-b border-border pb-4">
                                        {currentTitle}
                                    </h2>
                                )}

                                <div className="flex flex-col gap-6">
                                    {currentItems.map((item, i) => {
                                        const hasChildren = (item.items?.length ?? 0) > 0;

                                        return (
                                            <div key={item.titleKey} className="group overflow-hidden">
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.05, duration: 0.4 }}
                                                >
                                                    {hasChildren ? (
                                                        <button
                                                            onClick={() => handlePush(item)}
                                                            className="w-full flex items-center justify-between text-left font-serif text-4xl text-foreground hover:text-primary transition-colors"
                                                        >
                                                            <span>{t(item.titleKey as Parameters<typeof t>[0])}</span>
                                                            <span className="text-sm font-sans tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                                                {t("mobileMenu.exploreHint")}
                                                            </span>
                                                        </button>
                                                    ) : (
                                                        <Link
                                                            href={item.url || "#"}
                                                            onClick={closeMenu}
                                                            className={cn(
                                                                "block w-full font-serif text-4xl transition-colors",
                                                                !hasChildren ? "text-foreground hover:text-primary" : "text-foreground/80"
                                                            )}
                                                        >
                                                            {t(item.titleKey as Parameters<typeof t>[0])}
                                                        </Link>
                                                    )}
                                                </motion.div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {navStack.length === 0 && (
                                    <div className="mt-auto absolute bottom-8 left-8 right-8 pt-8 border-t border-border flex justify-between items-end">
                                        <div>
                                            <p className="font-serif text-xl text-accent mb-1">{t("mobileMenu.footerBrandTitle")}</p>
                                            <p className="text-xs font-sans tracking-widest uppercase text-foreground/50">
                                                {t("mobileMenu.footerBrandSubtitle")}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => {
                                                startTransition(() => {
                                                    router.replace(pathname, { locale: isEnglish ? "hi" : "en" });
                                                });
                                            }}
                                            disabled={isPending}
                                            lang={isEnglish ? "hi" : "en"}
                                            className={cn(
                                                "font-serif italic text-3xl text-foreground hover:text-primary transition-colors",
                                                isPending && "opacity-50"
                                            )}
                                        >
                                            {isEnglish ? "हिंदी" : "English"}
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}