import React from "react";

export const BooksSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-32 animate-pulse flex gap-12">
            <div className="w-1/4 h-96 bg-border/20 rounded-[var(--radius-surface)]" />
            <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="aspect-[4/5] bg-border/20 rounded-[var(--radius-surface)]" />
                ))}
            </div>
        </div>
    );
};