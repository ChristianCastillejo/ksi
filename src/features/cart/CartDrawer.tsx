"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "./store";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, X, Plus, Minus, Globe, ArrowRight, ExternalLink, BookOpen, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { type CartItem } from "./store";
import { Link } from "@/i18n/routing";

export default function CartDrawer() {
    const { items, isOpen, closeCart, updateQuantity, removeItem } = useCartStore();
    const [destination, setDestination] = useState<"india" | "international" | null>(null);

    const subtotal = items.reduce((acc: number, item: CartItem) => acc + (item.price * item.quantity), 0);

    useEffect(() => {
        useCartStore.persist.rehydrate();
    }, []);

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
            <SheetContent side="right" className="w-full sm:max-w-md p-0 bg-background border-l border-border flex flex-col">

                <SheetHeader className="px-8 py-6 border-b border-border/50 flex flex-row items-center justify-between space-y-0 text-left">
                    <SheetTitle className="font-serif text-2xl flex items-center gap-3">
                        Selected Texts
                    </SheetTitle>

                    <button
                        onClick={closeCart}
                        className="text-foreground hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm cursor-pointer"
                        aria-label="Close Cart"
                    >
                        <X strokeWidth={1} size={32} />
                    </button>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 min-h-0">
                    {items.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                            <BookOpen size={48} strokeWidth={1} className="mb-4" />
                            <p className="font-serif italic text-lg">Your study archive is empty</p>
                        </div>
                    ) : (
                        items.map((item: CartItem) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="relative h-28 w-20 bg-muted rounded-sm overflow-hidden shrink-0 border border-border shadow-sm">
                                    <Image src={item.image || "/placeholder-book.jpg"} alt={item.title} fill className="object-cover" />
                                </div>

                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start gap-2">
                                            <h4 className="font-serif text-lg leading-tight text-foreground">{item.title}</h4>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-foreground/30 hover:text-destructive transition-colors mt-1"
                                                aria-label="Remove item"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                        {item.subtitle && <p className="text-xs text-foreground/60 font-sans mt-1">{item.subtitle}</p>}
                                    </div>

                                    <div className="flex justify-between items-center mt-4">
                                        <div className="flex items-center border border-border/60 rounded-[var(--radius-interaction)] px-2 py-1 bg-surface">
                                            <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="text-foreground/50 hover:text-accent p-1 transition-colors">
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-xs font-mono w-8 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-foreground/50 hover:text-accent p-1 transition-colors">
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <span className="font-mono text-sm font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t border-border bg-surface shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-10">

                        <div className="p-6 pb-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className={cn(
                                    "text-[10px] font-sans font-bold uppercase tracking-widest transition-colors duration-300",
                                    destination === null ? "text-accent" : "text-foreground/50"
                                )}>
                                    Select Shipping Destination *
                                </span>
                            </div>

                            <div className={cn(
                                "flex p-1 bg-background rounded-[var(--radius-interaction)] transition-all duration-500 gap-1",
                                destination === null ? "border-accent ring-4 ring-primary/50" : "border-border"
                            )}>
                                <button
                                    onClick={() => setDestination("india")}
                                    className={cn(
                                        "flex-1 py-2.5 text-xs font-medium rounded-[var(--radius-interaction)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer",
                                        destination === "india" ? "bg-foreground text-background shadow-md" : "text-foreground/60 hover:text-foreground border border-border"
                                    )}
                                >
                                    <MapPin size={12} className={destination === "india" ? "text-background" : "text-foreground/40"} />
                                    Within India
                                </button>
                                <button
                                    onClick={() => setDestination("international")}
                                    className={cn(
                                        "flex-1 py-2.5 text-xs font-medium rounded-[var(--radius-interaction)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer",
                                        destination === "international" ? "bg-foreground text-background shadow-md" : "text-foreground/60 hover:text-foreground border border-border"
                                    )}
                                >
                                    <Globe size={12} className={destination === "international" ? "text-background" : "text-foreground/40"} />
                                    International
                                </button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {destination !== null && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="overflow-hidden"
                                >
                                    <SheetFooter className="px-6 pb-6 pt-2 flex flex-col gap-5 border-t border-border/50">


                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={destination}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                                className="flex flex-col gap-3 w-full"
                                            >
                                                {destination === "international" ? (
                                                    <div className="flex flex-col gap-3 w-full">
                                                        <div className="p-4 bg-accent/5 border border-accent/20 rounded-[var(--radius-content)] text-xs text-accent font-sans leading-relaxed">
                                                            The Trust only ships physical copies within India. For international orders, please visit our global partner.
                                                        </div>
                                                        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-white uppercase tracking-widest text-xs py-6 group">
                                                            <a href="https://www.lakshmanjooacademy.org/books" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                                                                Lakshmanjoo Academy <ExternalLink size={14} className="ml-2 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                                            </a>
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col gap-3 w-full">
                                                        <div className="flex justify-between items-center w-full">
                                                            <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-foreground/50">Subtotal</span>
                                                            <span className="font-serif text-3xl">₹{subtotal.toLocaleString()}</span>
                                                        </div>
                                                        <div className="flex flex-col gap-3 w-full">
                                                            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white uppercase tracking-widest text-xs py-6 shadow-xl shadow-primary/20 group ">
                                                                <Link href="/checkout" onClick={closeCart} className="flex items-center justify-center">
                                                                    Request Order <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        </AnimatePresence>
                                    </SheetFooter>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}