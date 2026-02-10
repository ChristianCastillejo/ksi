"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, AlertCircle, ExternalLink, Globe, X, Minus, Plus, BookOpen, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore, type CartItem } from "@/features/cart/store";
import { submitCheckoutForm, type CheckoutState } from "@/features/checkout/actions";

export interface CheckoutClientContent {
    successTitle: string;
    successDesc: string;
    returnBtn: string;
    emptyTitle: string;
    emptyDesc: string;
    exploreBtn: string;
    manualProcTitle: string;
    manualProcDesc: string;
    selectedTextsTitle: string;
    totalLabel: string;
    shippingNote: string;
    outsideIndiaLabel: string;
    visitAcademyBtn: string;
    formTitle: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    phoneNote: string;
    addressLabel: string;
    cityLabel: string;
    stateLabel: string;
    pinLabel: string;
    countryLabel: string;
    countryValue: string;
    submitBtn: string;
    submittingBtn: string;
    currencySymbol: string;
    intlToastTitle: string;
    intlToastDesc: string;
    intlToastBtn: string;
}

const initialState: CheckoutState = { message: "", success: false, errors: {}, fields: {}, timestamp: 0 };

export const CheckoutClient = ({ content }: { content: CheckoutClientContent }) => {
    const { items, clearCart, updateQuantity, removeItem } = useCartStore();
    const [state, formAction, isPending] = useActionState(submitCheckoutForm, initialState);

    const total = items.reduce((acc: number, item: CartItem) => acc + (item.price * item.quantity), 0);

    useEffect(() => {
        if (state.timestamp && state.timestamp > 0) {
            if (state.success) {
                clearCart();
                toast.success(state.message);
            } else if (state.message && (!state.errors || Object.keys(state.errors).length === 0)) {
                toast.error(state.message);
            } else {
                toast.error("Please correct the errors in the form.");
            }
        }
    }, [state.timestamp, state.success, state.message, state.errors, clearCart]);

    return (
        <section className="max-w-7xl mx-auto px-6 lg:px-16 mt-16 pb-32">
            <AnimatePresence mode="wait">
                {state.success ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-20 bg-surface border border-border rounded-[var(--radius-content)] shadow-sm max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle2 size={40} className="text-green-600" />
                        </div>
                        <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{content.successTitle}</h3>
                        <p className="font-sans text-foreground/70 leading-relaxed max-w-md mb-8">{content.successDesc}</p>
                        <Button asChild variant="outline" className="uppercase tracking-widest text-xs">
                            <Link href="/storebook">{content.returnBtn}</Link>
                        </Button>
                    </motion.div>
                ) : items.length === 0 ? (
                    <motion.div key="empty" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-20 bg-surface border border-border rounded-[var(--radius-content)] shadow-sm max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-accent/5 border border-accent/10 rounded-full flex items-center justify-center mb-6">
                            <BookOpen size={40} className="text-accent" strokeWidth={1} />
                        </div>
                        <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{content.emptyTitle}</h3>
                        <p className="font-sans text-foreground/70 leading-relaxed max-w-md mb-8">{content.emptyDesc}</p>
                        <Button asChild className="uppercase tracking-widest text-xs shadow-xl shadow-primary/20 group">
                            <Link href="/storebook" className="flex flex-row gap-2">
                                <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                                {content.exploreBtn}
                            </Link>
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div key="checkout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24 items-start">

                        <div className="lg:col-span-5 flex flex-col gap-10 lg:sticky lg:top-32">
                            <div className="bg-accent/5 border border-accent/20 p-6 rounded-[var(--radius-content)] flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-accent font-serif text-xl">
                                    <AlertCircle size={20} />
                                    <h3>{content.manualProcTitle}</h3>
                                </div>
                                <p className="font-sans text-sm text-foreground/70 leading-relaxed">{content.manualProcDesc}</p>
                            </div>

                            <div className="bg-surface border border-border rounded-[var(--radius-content)] p-6">
                                <h3 className="font-serif text-2xl text-foreground mb-6 border-b border-border pb-4">{content.selectedTextsTitle}</h3>
                                <div className="flex flex-col gap-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4 font-sans border-b border-border/50 pb-4 last:border-0 last:pb-0">
                                            <div className="relative h-16 w-12 bg-muted rounded-sm overflow-hidden shrink-0 border border-border shadow-sm">
                                                <Image src={item.image || "/placeholder-book.jpg"} alt={item.title} fill className="object-cover" sizes="100px" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div className="flex justify-between items-start gap-2">
                                                    <span className="text-foreground/90 font-serif text-lg leading-tight">{item.title}</span>
                                                    <button type="button" onClick={() => removeItem(item.id)} className="text-foreground/30 hover:text-destructive transition-colors mt-1 cursor-pointer">
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                                <div className="flex justify-between items-center mt-3">
                                                    <div className="flex items-center border border-border/60 rounded-[var(--radius-interaction)] px-2 py-1 bg-background shadow-sm">
                                                        <button type="button" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="text-foreground/50 hover:text-accent p-1 transition-colors cursor-pointer"><Minus size={14} /></button>
                                                        <span className="text-xs font-mono w-8 text-center">{item.quantity}</span>
                                                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-foreground/50 hover:text-accent p-1 transition-colors cursor-pointer"><Plus size={14} /></button>
                                                    </div>
                                                    <span className="font-mono font-medium text-foreground shrink-0">
                                                        {content.currencySymbol}{(item.price * item.quantity).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex justify-between items-center mt-2 pt-4 border-t border-border">
                                        <span className="font-sans text-xs uppercase tracking-widest font-bold text-foreground/50">{content.totalLabel}</span>
                                        <div className="text-right">
                                            <span className="font-serif text-3xl text-accent block">{content.currencySymbol}{total.toLocaleString()}</span>
                                            <span className="text-[10px] text-foreground/40 font-sans tracking-wide">{content.shippingNote}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-foreground/40">{content.outsideIndiaLabel}</span>
                                <Link href="https://www.lakshmanjooacademy.org/books" target="_blank" className="group flex items-center justify-between p-4 border border-border rounded-lg hover:border-accent transition-colors">
                                    <span className="font-sans text-sm text-foreground group-hover:text-accent flex items-center gap-2"><Globe size={16} /> {content.visitAcademyBtn}</span>
                                    <ExternalLink size={16} className="text-foreground/30 group-hover:text-accent" />
                                </Link>
                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <div className="bg-surface border border-border p-8 md:p-12 rounded-[var(--radius-content)] shadow-sm">
                                <form action={formAction} className={cn("flex flex-col gap-6 transition-opacity duration-300", isPending && "opacity-60 pointer-events-none")}>

                                    <input type="hidden" name="cartItems" value={JSON.stringify(items)} />

                                    <div className="mb-4 border-b border-border pb-4">
                                        <h3 className="font-serif text-3xl text-foreground mb-2">{content.formTitle}</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.nameLabel}</label>
                                            <Input name="name" defaultValue={state.fields?.name || ""} placeholder="Your Name" className="bg-background" />
                                            {state.errors?.name && <span className="text-destructive text-xs">{state.errors.name}</span>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.emailLabel}</label>
                                            <Input name="email" type="email" defaultValue={state.fields?.email || ""} placeholder="you@example.com" className="bg-background" />
                                            {state.errors?.email && <span className="text-destructive text-xs">{state.errors.email}</span>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.phoneLabel}</label>
                                        <Input name="phone" type="tel" defaultValue={state.fields?.phone || ""} placeholder="+91..." className="bg-background" />
                                        <p className="text-[10px] text-foreground/40">{content.phoneNote}</p>
                                        {state.errors?.phone && <span className="text-destructive text-xs">{state.errors.phone}</span>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.addressLabel}</label>
                                        <Input name="address" defaultValue={state.fields?.address || ""} placeholder="House No, Street, Landmark" className="bg-background" />
                                        {state.errors?.address && <span className="text-destructive text-xs">{state.errors.address}</span>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.cityLabel}</label>
                                            <Input name="city" defaultValue={state.fields?.city || ""} placeholder="City" className="bg-background" />
                                            {state.errors?.city && <span className="text-destructive text-xs">{state.errors.city}</span>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.stateLabel}</label>
                                            <Input name="state" defaultValue={state.fields?.state || ""} placeholder="State" className="bg-background" />
                                            {state.errors?.state && <span className="text-destructive text-xs">{state.errors.state}</span>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.pinLabel}</label>
                                            <Input name="pincode" defaultValue={state.fields?.pincode || ""} placeholder="110001" className="bg-background" />
                                            {state.errors?.pincode && <span className="text-destructive text-xs">{state.errors.pincode}</span>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-accent">{content.countryLabel}</label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    toast(content.intlToastTitle, {
                                                        description: content.intlToastDesc,
                                                        action: {
                                                            label: content.intlToastBtn,
                                                            onClick: () => window.open("https://www.lakshmanjooacademy.org/books", "_blank")
                                                        },
                                                        duration: 8000,
                                                    });
                                                }}
                                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-muted/30 px-3 py-2 text-sm ring-offset-background cursor-not-allowed hover:border-accent/50 hover:bg-accent/5 transition-all text-foreground/60 group"
                                            >
                                                <span>{content.countryValue}</span>
                                                <Globe size={16} className="text-foreground/30 group-hover:text-accent transition-colors" />
                                            </button>
                                        </div>
                                    </div>

                                    <SubmitButton disabled={items.length === 0} normalText={content.submitBtn} pendingText={content.submittingBtn} />
                                </form>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

function SubmitButton({ disabled, normalText, pendingText }: { disabled: boolean, normalText: string, pendingText: string }) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending || disabled} isLoading={pending} className="uppercase tracking-widest w-full py-6 mt-4 shadow-xl shadow-primary/20">
            <Send size={16} className="mr-2" /> {pending ? pendingText : normalText}
        </Button>
    );
}