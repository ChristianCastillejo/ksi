"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

interface ErrorBoundaryProps {
    error: Error & { digest?: string };
    reset: () => void;
}

const CONTENT = {
    titleLine1: "A momentary",
    titleLine2: "disturbance",
    description: "We apologize, but an unexpected interruption occurred while trying to load this section. Our systems have logged the event.",
    tryAgainBtn: "Try Again",
    homeBtn: "Return to Home",
    errorHashPrefix: "Error Hash:"
};

export default function GlobalError({ error, reset }: ErrorBoundaryProps) {

    useEffect(() => {
        console.error("Application Error Caught by Boundary:", error);
    }, [error]);

    return (
        <div className="relative w-full min-h-screen bg-background flex items-center justify-center px-6 text-foreground">
            <div className="max-w-xl w-full bg-surface border border-border p-10 md:p-16 rounded-[var(--radius-content)] shadow-sm text-center flex flex-col items-center">

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: "spring" }}
                    className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-8"
                >
                    <AlertCircle size={28} className="text-destructive" strokeWidth={1.5} />
                </motion.div>

                <h1 className="font-serif text-3xl md:text-4xl mb-4">
                    {CONTENT.titleLine1} <span className="italic text-foreground/60">{CONTENT.titleLine2}</span>
                </h1>

                <p className="font-sans text-sm md:text-base text-foreground/70 leading-relaxed mb-10">
                    {CONTENT.description}
                </p>

                <div className="flex flex-col gap-4 w-full sm:w-auto">
                    <Button
                        stable
                        onClick={() => reset()}
                        variant="outline"
                        size="lg"
                        className="uppercase tracking-widest w-full group"
                    >
                        <RefreshCcw size={16} className="mr-2 group-hover:rotate-180 transition-transform duration-500" />
                        {CONTENT.tryAgainBtn}
                    </Button>

                    <Button stable asChild variant="primary" size="lg" className="uppercase tracking-widest w-full">
                        <Link href="/" className="flex items-center justify-center gap-2">
                            <Home size={16} /> {CONTENT.homeBtn}
                        </Link>
                    </Button>
                </div>

                {error.digest && (
                    <p className="mt-8 text-[10px] font-sans text-foreground/30 tracking-wider">
                        {CONTENT.errorHashPrefix} {error.digest}
                    </p>
                )}
            </div>
        </div>
    );
}