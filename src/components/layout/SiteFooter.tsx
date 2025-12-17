"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
    Footer,
    FooterContainer,
    FooterGrid,
    FooterTitle,
    FooterDescription,
    FooterLabel,
    FooterLink,
    FooterBottom
} from "@/components/ui/footer";
import { Button } from "@/components/ui/button";

import { getTenant, TenantId } from "@/lib/tenant";

export default function SiteFooter() {
    const t = useTranslations("Footer");
    const tBrand = useTranslations("Brand");
    const [tenant, setTenant] = useState<TenantId>("srinagar");

    useEffect(() => {
        setTenant(getTenant(window.location.hostname));
    }, []);

    const currentYear = new Date().getFullYear();

    return (
        <Footer className="border-t-1 border-background/10">
            <FooterContainer>
                <FooterGrid>

                    <div className="lg:col-span-4 flex flex-col items-start">
                        <FooterTitle>{tBrand(`${tenant}.title`)}</FooterTitle>
                        <FooterDescription>
                            {tBrand(`${tenant}.description`)}
                        </FooterDescription>

                        <Button asChild variant="outline" className="mt-8 bg-transparent border-white/20 text-white hover:bg-white hover:text-secondary uppercase tracking-widest text-xs">
                            <Link href="/donate">{t("supportBtn")}</Link>
                        </Button>
                    </div>

                    <div className="lg:col-span-3 lg:col-start-6 flex flex-col">
                        <FooterLabel>{t("wisdom.label")}</FooterLabel>
                        <nav className="flex flex-col space-y-2" aria-label={t("wisdom.ariaLabel")}>
                            <FooterLink asChild><Link href="/kashmir-shaivism">{t("wisdom.kashmirShaivism")}</Link></FooterLink>
                            <FooterLink asChild><Link href="/swami-lakshmanjoo">{t("wisdom.swamiLakshmanjoo")}</Link></FooterLink>
                            <FooterLink asChild><Link href="/storebook">{t("wisdom.textsPublications")}</Link></FooterLink>
                            <FooterLink asChild><Link href="/workshops">{t("wisdom.immersiveWorkshops")}</Link></FooterLink>
                        </nav>
                    </div>

                    <div className="lg:col-span-2 flex flex-col">
                        <FooterLabel>{t("trust.label")}</FooterLabel>
                        <nav className="flex flex-col space-y-2" aria-label={t("trust.ariaLabel")}>
                            <FooterLink asChild><Link href="/about">{t("trust.aboutUs")}</Link></FooterLink>
                            <FooterLink asChild><Link href="/ashrams">{t("trust.ourAshrams")}</Link></FooterLink>
                            <FooterLink asChild><Link href="/community">{t("trust.community")}</Link></FooterLink>
                            <FooterLink asChild><Link href="/faq">{t("trust.faq")}</Link></FooterLink>
                        </nav>
                    </div>

                    <div className="lg:col-span-2 flex flex-col">
                        <FooterLabel>{t("connect.label")}</FooterLabel>
                        <nav className="flex flex-col space-y-2" aria-label={t("connect.ariaLabel")}>
                            <FooterLink asChild><Link href="/contact">{t("connect.contactUs")}</Link></FooterLink>
                            <FooterLink asChild><a href="https://youtube.com/@lakshmanjooacademy" target="_blank" rel="noopener noreferrer">{t("connect.youtube")}</a></FooterLink>
                        </nav>
                    </div>

                </FooterGrid>

                <FooterBottom>
                    <div className="flex flex-col md:flex-row gap-1.5 md:gap-4 items-start">
                        <div className="text-white/40 text-xs font-sans">
                            © {currentYear} {t(`brand.${tenant}.copyright`)}. {t("legal.allRightsReserved")}
                        </div>
                        <div className="text-white/40 text-xs font-sans">
                            {t("legal.designedBy")} <a href="https://christiancastillejo.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-300">{t("legal.designedByLink")}</a>.
                        </div>
                    </div>

                    <nav className="flex items-center gap-6" aria-label={t("legal.ariaLabel")}>
                        <FooterLink asChild className="text-xs text-white/40 hover:text-white/80"><Link href="/privacy">{t("legal.privacyPolicy")}</Link></FooterLink>
                        <FooterLink asChild className="text-xs text-white/40 hover:text-white/80"><Link href="/terms">{t("legal.termsOfService")}</Link></FooterLink>
                        <FooterLink asChild className="text-xs text-white/40 hover:text-white/80"><Link href="/shipping">{t("legal.shippingPolicy")}</Link></FooterLink>
                    </nav>
                </FooterBottom>
            </FooterContainer>
        </Footer>
    );
}