"use client";

import { motion } from "framer-motion";
import { Compass, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import "../app/globals.css";

const CONTENT = {
    badge: "Error 404",
    titleLine1: "The Path Winds",
    titleLine2: "Elsewhere",
    description: "The page or text you are seeking cannot be found. It may have been moved, or perhaps it remains hidden for now.",
    returnBtn: "Return",
    homeBtn: "Home"
};

export default function GlobalNotFoundPage() {
    return (
        <html lang="en">
            <body>
                <div className="relative w-full min-h-screen bg-background flex items-center justify-center px-6">
                    <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <div className="max-w-2xl w-full flex flex-col items-center text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
                            className="w-20 h-20 bg-surface border border-border rounded-full flex items-center justify-center mb-8 shadow-sm"
                        >
                            <Compass size={32} className="text-accent" strokeWidth={1} />
                        </motion.div>

                        <motion.span
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-6 block"
                        >
                            {CONTENT.badge}
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            className="font-serif text-5xl md:text-7xl text-foreground leading-[1.1] mb-6"
                        >
                            {CONTENT.titleLine1} <br />
                            <span className="italic text-foreground/60">{CONTENT.titleLine2}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                            className="font-sans text-base md:text-lg text-foreground/70 leading-relaxed mb-12 max-w-md mx-auto"
                        >
                            {CONTENT.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Button variant="outline" size="lg" className="uppercase tracking-widest group" onClick={() => window.history.back()}>
                                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> {CONTENT.returnBtn}
                            </Button>

                            <Button asChild variant="primary" size="lg" className="uppercase tracking-widest">
                                <a href="/" className="flex items-center gap-2">
                                    <Home size={16} /> {CONTENT.homeBtn}
                                </a>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </body>
        </html>
    );
}