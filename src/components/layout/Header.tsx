"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { Menu, ChevronDown, ShoppingBag } from "lucide-react";

import { Navbar, NavbarContainer, NavbarBrand, NavbarContent, NavbarAction } from "@/components/ui/navbar";
import CartDrawer from "@/features/cart/CartDrawer";
import MobileMenu from "@/components/layout/MobileMenu";
import { headerMenuConfig, type NavMenuItemConfig } from "@/components/layout/navigation";
import { useCartStore } from "@/features/cart/store";
import { getTenant, type TenantId, getTenantName } from "@/lib/tenant";
import { cn } from "@/lib/utils";

export default function Header(): React.JSX.Element {
    const t = useTranslations("Header");
    const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
    const [tenant, setTenant] = useState<TenantId>("srinagar");

    const cartItemsCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

    const tBrand = useTranslations("Brand");
    const [isMounted, setIsMounted] = useState(false);

    const localizedBrandName = isMounted ? tBrand(`${tenant}.title`) : tBrand("srinagar.title");

    useEffect(() => {
        setTenant(getTenant(window.location.hostname));
        setIsMounted(true);
    }, []);

    return (
        <>
            <Navbar>
                <NavbarContainer>

                    <NavbarBrand>
                        <button
                            onClick={() => setOpenMobileMenu(true)}
                            className="cursor-pointer lg:hidden text-foreground hover:text-primary transition-colors"
                            aria-label={t("ariaLabels.openMobileMenu")}
                            type="button"
                        >
                            <Menu strokeWidth={1} size={28} />
                        </button>

                        <Link href="/" aria-label={t("ariaLabels.goToHome")} className="group flex items-center">
                            <span className={cn(
                                "font-serif text-2xl font-medium tracking-tight transition-opacity duration-150 ease-out",
                                !isMounted ? "opacity-0 select-none pointer-events-none" : "opacity-100"
                            )}>
                                {localizedBrandName}
                            </span>
                        </Link>
                    </NavbarBrand>

                    <NavbarContent>
                        <div className="flex items-center gap-4 xl:gap-10 h-full">
                            {headerMenuConfig?.map((item) => (
                                <DesktopMenuItem key={item.titleKey} item={item} t={(key) => t(key as Parameters<typeof t>[0])} />
                            ))}
                        </div>
                    </NavbarContent>

                    <NavbarAction>
                        <LanguageToggle className="hidden lg:block" />

                        <button
                            onClick={() => useCartStore.getState().openCart()}
                            className="relative p-2 text-foreground hover:text-primary transition-colors cursor-pointer group"
                            aria-label={t("ariaLabels.openCart")}
                        >
                            <ShoppingBag size={24} strokeWidth={1.5} className="group-hover:scale-105 transition-transform" />
                            {cartItemsCount > 0 && (
                                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold min-w-[20px] h-[20px] px-1 rounded-full flex items-center justify-center border-2 border-background shadow-sm animate-in zoom-in duration-300">
                                    {cartItemsCount}
                                </span>
                            )}
                        </button>
                    </NavbarAction>

                </NavbarContainer>
            </Navbar>

            <CartDrawer />
            <MobileMenu open={openMobileMenu} closeMenu={() => setOpenMobileMenu(false)} menu={headerMenuConfig || []} />
        </>
    );
}

function LanguageToggle({ className }: { className?: string }) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const isEnglish = locale === "en";
    const targetLocale = isEnglish ? "hi" : "en";

    const targetLanguageLabel = isEnglish ? "हिंदी" : "English";

    const ariaLabel = isEnglish ? "Switch to Hindi" : "अंग्रेजी में बदलें";

    const toggleLanguage = () => {
        startTransition(() => {
            router.replace(pathname, { locale: targetLocale });
        });
    };

    return (
        <button
            onClick={toggleLanguage}
            disabled={isPending}
            lang={targetLocale}
            aria-label={ariaLabel}
            className={cn(
                "font-serif italic text-xl transition-all duration-300",
                isPending ? "opacity-50 cursor-not-allowed" : "text-foreground/70 hover:text-primary cursor-pointer",
                className
            )}
        >
            {targetLanguageLabel}
        </button>
    );
}

interface DesktopMenuItemProps {
    item: NavMenuItemConfig;
    t: (key: string) => string;
}

const DesktopMenuItem = ({ item, t }: DesktopMenuItemProps): React.JSX.Element | null => {
    if (!item?.titleKey || !item?.url) return null;

    const hasChild = (item.items?.length ?? 0) > 0;
    const hasGrandChild = item.items?.some((subItem) => (subItem.items?.length ?? 0) > 0) ?? false;
    const title = t(item.titleKey as Parameters<typeof t>[0]);

    return (
        <div className="relative group h-full flex items-center py-2">
            <Link
                className={cn(
                    "flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-[0.15em] transition-colors duration-300",
                    "text-foreground/80 hover:text-primary whitespace-nowrap"
                )}
                href={item.url}
            >
                {title}
                {hasChild && (
                    <ChevronDown
                        size={14}
                        strokeWidth={2}
                        className="opacity-50 group-hover:opacity-100 transition-transform duration-300 group-hover:-rotate-180"
                    />
                )}
            </Link>

            {hasChild && (
                <div className="absolute top-[calc(100%)] left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform origin-top translate-y-2 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto z-50">
                    {hasGrandChild ? (
                        <GrandChildMenu items={item.items} t={t} />
                    ) : (
                        <ChildMenu items={item.items} t={t} />
                    )}
                </div>
            )}
        </div>
    );
};

interface ChildMenuProps {
    items: NavMenuItemConfig[];
    t: (key: string) => string;
}

const ChildMenu = ({ items, t }: ChildMenuProps): React.JSX.Element | null => {
    if (!items?.length) return null;

    return (
        <nav
            className="flex flex-col min-w-[220px] bg-background border border-border/60 shadow-xl p-3 rounded-[var(--radius-content)]"
            aria-label="Submenu"
        >
            {items.map((item) =>
                item?.url && item?.titleKey ? (
                    <Link
                        key={item.titleKey}
                        href={item.url}
                        className="px-4 py-3 text-sm font-sans tracking-wide text-foreground/70 hover:text-primary hover:bg-muted/50 transition-colors block"
                    >
                        {t(item.titleKey as Parameters<typeof t>[0])}
                    </Link>
                ) : null
            )}
        </nav>
    );
};

const GrandChildMenu = ({ items, t }: ChildMenuProps): React.JSX.Element | null => {
    if (!items?.length) return null;

    return (
        <nav
            className="flex gap-12 lg:min-w-[650px] bg-background border border-border/60 shadow-2xl p-10"
            aria-label="Mega menu"
        >
            {items.map((item: NavMenuItemConfig) =>
                item?.url && item?.titleKey ? (
                    <div key={item.titleKey} className="flex flex-col flex-1">
                        <Link
                            key={item.titleKey}
                            href={item.url}
                            className="px-4 py-3 text-sm font-sans tracking-wide text-foreground/70 hover:text-primary hover:bg-muted/50 transition-colors block"
                        >
                            {t(item.titleKey as Parameters<typeof t>[0])}
                        </Link>

                        <div className="flex flex-col gap-3">
                            {item.items?.map((subItem: NavMenuItemConfig) =>
                                subItem?.url && subItem?.titleKey ? (
                                    <Link
                                        key={subItem.titleKey}
                                        href={subItem.url}
                                        className="text-sm py-1 font-sans text-foreground/70 hover:text-primary transition-colors flex items-center gap-2 group/link"
                                    >
                                        <span className="w-0 h-[1px] bg-primary transition-all duration-300 group-hover/link:w-2"></span>
                                        {t(subItem.titleKey as Parameters<typeof t>[0])}
                                    </Link>
                                ) : null
                            )}
                        </div>
                    </div>
                ) : null
            )}
        </nav>
    );
};