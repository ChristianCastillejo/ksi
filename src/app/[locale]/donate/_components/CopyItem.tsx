"use client";

import React, { useState } from "react";
import { Copy, CheckCircle2 } from "lucide-react";

export const CopyItem = ({ label, value }: { label: string, value: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <li className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center py-3 border-b border-border/50 last:border-0 group">
            <span className="font-sans text-xs text-foreground/60 uppercase tracking-wider">{label}</span>
            <div className="flex items-center gap-3 mt-1 sm:mt-0">
                <span className="font-mono text-sm text-foreground">{value}</span>
                <button onClick={handleCopy} type="button" className="text-accent hover:text-primary transition-colors" title="Copy to clipboard">
                    {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />}
                </button>
            </div>
        </li>
    );
};