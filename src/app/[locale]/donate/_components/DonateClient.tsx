"use client";

import React, { useState, useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Heart, Landmark, Info, QrCode, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { submitDonationForm, type DonateState } from "@/features/donate/actions";
import { CopyItem } from "./CopyItem";

export interface Organization {
    id: string;
    shortName: string;
    fullName: string;
    desc: string;
    tags: string[];
    bank: {
        name: string;
        accName: string;
        accNo: string;
        ifsc: string;
        address: string;
    };
    taxInfo: string;
    foreignAllowed: boolean;
}

export interface DonateClientContent {
    organizations: Organization[];
    bankDetailsTitle: string;
    accNameLabel: string;
    accNoLabel: string;
    bankNameLabel: string;
    ifscLabel: string;
    branchLabel: string;
    taxExemptLabel: string;
    foreignWarning: string;
    scanUpiLabel: string;
    informUsTitle: string;
    informUsDesc: string;
    informUsSteps: string[];
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    panLabel: string;
    utrLabel: string;
    amountLabel: string;
    addressLabel: string;
    uploadLabel: string;
    uploadDesc: string;
    uploadLimits: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successBtn: string;
}

const initialState: DonateState = { message: "", success: false, errors: {}, fields: {}, timestamp: 0 };

export const DonateClient = ({ content }: { content: DonateClientContent }) => {
    const [selectedId, setSelectedId] = useState(content.organizations[0]?.id || "ksi");
    const activeOrg = content.organizations.find(org => org.id === selectedId)!;

    const [state, formAction] = useActionState(submitDonationForm, initialState);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    useEffect(() => {
        if (state.timestamp && state.timestamp > 0) {
            if (state.success) {
                toast.success(state.message);
                setFileName(null);
            } else if (state.message && (!state.errors || Object.keys(state.errors).length === 0)) {
                toast.error(state.message);
            } else {
                toast.error("Please correct the errors in the form.");
            }
        }
    }, [state.timestamp, state.success, state.message, state.errors]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-6 lg:px-16 mt-16">

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    {content.organizations.map(org => (
                        <Button
                            stable
                            variant="secondary"
                            key={org.id}
                            onClick={() => setSelectedId(org.id)}
                            className={cn(
                                "hover:bg-background hover:text-foreground hover:border-foreground border-1 uppercase tracking-wide",
                                selectedId === org.id
                                    ? "bg-foreground text-background border-foreground hover:bg-foreground hover:text-background shadow-xl"
                                    : "bg-surface text-foreground/60"
                            )}
                        >
                            {org.shortName}
                        </Button>
                    ))}
                </div>
            </motion.div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 xl:grid-cols-12 gap-12"
                >
                    <div className="xl:col-span-5 flex flex-col gap-8">
                        <div>
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{activeOrg.fullName}</h2>
                            <p className="font-sans text-foreground/70 leading-relaxed">{activeOrg.desc}</p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {activeOrg.tags.map(tag => (
                                    <Badge key={tag} variant="outline" className="border-accent/30 text-accent uppercase text-[9px] tracking-widest">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <Card variant="stable" className="bg-surface border-border overflow-hidden rounded-[var(--radius-content)]">
                            <CardContent className="p-0">
                                <div className="bg-secondary p-6 text-secondary-foreground flex items-center gap-3">
                                    <Landmark size={20} className="text-accent" />
                                    <h3 className="font-serif text-xl">{content.bankDetailsTitle}</h3>
                                </div>
                                <div className="p-6">
                                    <ul className="flex flex-col">
                                        <CopyItem label={content.accNameLabel} value={activeOrg.bank.accName} />
                                        <CopyItem label={content.accNoLabel} value={activeOrg.bank.accNo} />
                                        <CopyItem label={content.bankNameLabel} value={activeOrg.bank.name} />
                                        <CopyItem label={content.ifscLabel} value={activeOrg.bank.ifsc} />
                                        <CopyItem label={content.branchLabel} value={activeOrg.bank.address} />
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-6 bg-accent/5 border border-accent/20 rounded-[var(--radius-content)] flex gap-4">
                            <Info size={24} className="text-accent shrink-0" />
                            <div className="font-sans text-sm text-foreground/70 flex flex-col gap-2">
                                <p><strong>{content.taxExemptLabel}</strong> {activeOrg.taxInfo}</p>
                                {!activeOrg.foreignAllowed && (
                                    <p className="text-destructive font-medium">{content.foreignWarning}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="xl:col-span-7 bg-surface border border-border p-8 md:p-12 rounded-[var(--radius-content)]">

                        {state.success ? (
                            <div className="flex flex-col items-center text-center py-20">
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 size={40} className="text-green-600" />
                                </div>
                                <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{content.successTitle}</h3>
                                <p className="font-sans text-foreground/70 leading-relaxed max-w-md">{state.message}</p>
                                <Button variant="outline" onClick={() => window.location.reload()} className="mt-8 uppercase tracking-widest text-xs">{content.successBtn}</Button>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col md:flex-row gap-8 items-start mb-12 border-b border-border/50 pb-12">
                                    <div className="w-full md:w-1/3 lg:w-2/3 bg-background border border-border p-4 rounded-[var(--radius-interaction)] flex flex-col items-center text-center">
                                        <QrCode size={24} className="text-accent mb-4" />
                                        <div className="relative w-full aspect-square bg-muted mb-4 rounded-md overflow-hidden">
                                            <Image src={`/images/donate/qr-${activeOrg.id}.png`} alt="UPI QR Code" fill className="object-contain p-2" />
                                        </div>
                                        <span className="font-sans text-[10px] uppercase tracking-widest text-foreground/60">{content.scanUpiLabel}</span>
                                    </div>
                                    <div className="w-full md:w-2/3">
                                        <h3 className="font-serif text-3xl text-foreground mb-4">{content.informUsTitle}</h3>
                                        <p className="font-sans text-sm text-foreground/70 leading-relaxed mb-6">
                                            {content.informUsDesc}
                                        </p>
                                        <ul className="space-y-2 text-sm text-foreground/80 list-disc list-inside">
                                            {content.informUsSteps.map((step, i) => <li key={i}>{step}</li>)}
                                        </ul>
                                    </div>
                                </div>

                                <form action={formAction} className="space-y-6">
                                    <input type="hidden" name="organization" value={selectedId} />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.nameLabel}</label>
                                            <Input name="name" defaultValue={state.fields?.name || ""} placeholder="Your legal name" className="bg-background" />
                                            {state.errors?.name && <span className="text-destructive text-xs">{state.errors.name}</span>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.emailLabel}</label>
                                            <Input name="email" type="email" defaultValue={state.fields?.email || ""} placeholder="email@example.com" className="bg-background" />
                                            {state.errors?.email && <span className="text-destructive text-xs">{state.errors.email}</span>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.phoneLabel}</label>
                                            <Input name="phone" defaultValue={state.fields?.phone || ""} placeholder="+91..." className="bg-background" />
                                            {state.errors?.phone && <span className="text-destructive text-xs">{state.errors.phone}</span>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.panLabel}</label>
                                            <Input name="pan" defaultValue={state.fields?.pan || ""} placeholder="Required for Tax Exemption" className="bg-background" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.utrLabel}</label>
                                            <Input name="utr" defaultValue={state.fields?.utr || ""} placeholder="e.g. 1234567890" className="bg-background" />
                                            {state.errors?.utr && <span className="text-destructive text-xs">{state.errors.utr}</span>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.amountLabel}</label>
                                            <Input name="amount" type="number" defaultValue={state.fields?.amount || ""} placeholder="Enter amount" className="bg-background" />
                                            {state.errors?.amount && <span className="text-destructive text-xs">{state.errors.amount}</span>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.addressLabel}</label>
                                        <Textarea name="address" defaultValue={state.fields?.address || ""} placeholder="Required for generating the receipt" className="bg-background resize-none" rows={3} />
                                        {state.errors?.address && <span className="text-destructive text-xs">{state.errors.address}</span>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.uploadLabel}</label>
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className={cn(
                                                "border-2 border-dashed rounded-[var(--radius-interaction)] p-8 flex flex-col items-center justify-center transition-colors cursor-pointer bg-background",
                                                fileName ? "border-accent/50 text-foreground" : "border-border text-foreground/50 hover:bg-surface hover:text-foreground hover:border-accent/50"
                                            )}
                                        >
                                            <Upload size={24} className="mb-3 text-accent" />
                                            <span className="font-sans text-sm font-medium">{fileName ? fileName : content.uploadDesc}</span>
                                            {!fileName && <span className="font-sans text-xs mt-1 opacity-70">{content.uploadLimits}</span>}
                                        </div>
                                        <input
                                            type="file"
                                            name="receipt"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            className="hidden"
                                            accept="image/jpeg,image/png,application/pdf"
                                        />
                                        {state.errors?.receipt && <span className="text-destructive text-xs">{state.errors.receipt}</span>}
                                    </div>

                                    <SubmitButton normalText={content.submitBtn} pendingText={content.submittingBtn} />
                                </form>
                            </>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
};

function SubmitButton({ normalText, pendingText }: { normalText: string, pendingText: string }) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} isLoading={pending} className="w-full uppercase tracking-widest shadow-xl shadow-primary/20 h-14 mt-4" size="lg">
            <Heart size={16} className="mr-2" /> {pending ? pendingText : normalText}
        </Button>
    );
}