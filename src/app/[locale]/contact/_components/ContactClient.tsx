"use client";

import React, { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/select";
import { submitContactForm, type ContactState } from "@/features/contact/actions";

export interface Organization {
    id: string;
    name: string;
    tag: string;
    address: string;
    phones: string[];
    email: string;
}

export interface ContactClientContent {
    reachTitleMain: string;
    reachTitleItalic: string;
    reachDescription: string;
    formTitle: string;
    destLabel: string;
    destPlaceholder: string;
    destError: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    successTitle: string;
    successBtn: string;
    submitBtn: string;
    submittingBtn: string;
    organizations: Organization[];
}

interface ContactClientProps {
    content: ContactClientContent;
}

const initialState: ContactState = {
    message: "",
    success: false,
    errors: {},
    fields: {},
    timestamp: 0
};

export const ContactClient = ({ content }: ContactClientProps) => {
    const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
    const [selectedOrg, setSelectedOrg] = useState<string>("");

    useEffect(() => {
        if (state.timestamp && state.timestamp > 0) {
            if (state.success) {
                toast.success(state.message);
            } else if (state.message && (!state.errors || Object.keys(state.errors).length === 0)) {
                toast.error(state.message);
            } else {
                toast.error("Please correct the errors in the form.");
            }
        }
    }, [state.timestamp, state.success, state.message, state.errors]);

    return (
        <section className="max-w-7xl mx-auto px-6 lg:px-16 mt-16 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24 items-start">

                <div className="lg:col-span-5 flex flex-col gap-10 lg:sticky lg:top-32">
                    <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6">
                        {content.reachTitleMain} <br />
                        <span className="italic text-foreground/60">{content.reachTitleItalic}</span>
                    </h2>
                    <p className="font-sans text-foreground/70 leading-relaxed text-sm">
                        {content.reachDescription}
                    </p>

                    <div className="flex flex-col gap-6">
                        {content.organizations.map((org) => (
                            <Card variant="stable" key={org.id} className="bg-surface border-border hover:border-accent/30 transition-colors">
                                <CardContent className="p-6 md:p-8 flex flex-col gap-6">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-serif text-xl md:text-2xl text-foreground">{org.name}</h3>
                                        <Badge variant="secondary" className="bg-background text-foreground/60 uppercase text-[9px] tracking-widest border border-border hover:text-background mt-1">
                                            {org.tag}
                                        </Badge>
                                    </div>
                                    <div className="flex flex-col gap-4 font-sans text-sm text-foreground/70">
                                        <div className="flex items-start gap-3">
                                            <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
                                            <span>{org.address}</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Phone size={16} className="text-accent shrink-0 mt-0.5" />
                                            <div className="flex flex-col">
                                                {org.phones.map(phone => <span key={phone}>{phone}</span>)}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Mail size={16} className="text-accent shrink-0" />
                                            <a href={`mailto:${org.email}`} className="hover:text-primary transition-colors">{org.email}</a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-7 bg-surface border border-border p-8 md:p-12 rounded-[var(--radius-content)] shadow-sm">
                    <AnimatePresence mode="wait">
                        {state.success ? (
                            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-20">
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 size={40} className="text-green-600" />
                                </div>
                                <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{content.successTitle}</h3>
                                <p className="font-sans text-foreground/70 leading-relaxed max-w-md">{state.message}</p>
                                <Button variant="outline" onClick={() => window.location.reload()} className="mt-8 uppercase tracking-widest text-xs">{content.successBtn}</Button>
                            </motion.div>
                        ) : (
                            <motion.form
                                action={formAction}
                                className={cn(
                                    "flex flex-col gap-6 transition-opacity duration-300",
                                    isPending && "opacity-60 pointer-events-none"
                                )}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="mb-4">
                                    <h3 className="font-serif text-3xl text-foreground mb-2">{content.formTitle}</h3>
                                </div>

                                <input type="hidden" name="organization" value={selectedOrg} />

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.destLabel}</label>
                                    <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder={content.destPlaceholder} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {content.organizations.map(org => (
                                                <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {state.errors?.organization && selectedOrg === "" && <span className="text-destructive text-xs">{content.destError}</span>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.nameLabel}</label>
                                        <Input name="name" defaultValue={state.fields?.name || ""} placeholder={content.namePlaceholder} className="bg-background" />
                                        {state.errors?.name && <span className="text-destructive text-xs">{state.errors.name}</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.emailLabel}</label>
                                        <Input name="email" type="email" defaultValue={state.fields?.email || ""} placeholder={content.emailPlaceholder} className="bg-background" />
                                        {state.errors?.email && <span className="text-destructive text-xs">{state.errors.email}</span>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.phoneLabel}</label>
                                        <Input name="phone" type="tel" defaultValue={state.fields?.phone || ""} placeholder={content.phonePlaceholder} className="bg-background" />
                                        {state.errors?.phone && <span className="text-destructive text-xs">{state.errors.phone}</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.subjectLabel}</label>
                                        <Input name="subject" defaultValue={state.fields?.subject || ""} placeholder={content.subjectPlaceholder} className="bg-background" />
                                        {state.errors?.subject && <span className="text-destructive text-xs">{state.errors.subject}</span>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.messageLabel}</label>
                                    <Textarea name="message" defaultValue={state.fields?.message || ""} placeholder={content.messagePlaceholder} className="bg-background resize-none" rows={5} />
                                    {state.errors?.message && <span className="text-destructive text-xs">{state.errors.message}</span>}
                                </div>

                                <SubmitButton normalText={content.submitBtn} pendingText={content.submittingBtn} />
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

function SubmitButton({ normalText, pendingText }: { normalText: string, pendingText: string }) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            className="uppercase tracking-widest"
            isLoading={pending}
        >
            <Send size={16} className="mr-2" /> {pending ? pendingText : normalText}
        </Button>
    );
}