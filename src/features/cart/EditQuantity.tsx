"use client";

import { useTranslations } from "next-intl";
import { useCartStore, type CartItem } from "@/features/cart/store";
import { Minus, Plus } from "lucide-react";

interface Props {
    readonly item: CartItem;
}

export default function EditQuantity({ item }: Props) {
    const t = useTranslations("Cart");
    const { updateQuantity } = useCartStore();

    const stock = item.stock;

    const handleUpdateQuantity = (newQuantity: number) => {
        if (newQuantity < 1) return;
        if (newQuantity > stock) return;

        updateQuantity(item.id, newQuantity);
    };

    const isMinReached = item.quantity <= 1;
    const isMaxReached = item.quantity >= stock;

    return (
        <div className="flex gap-1 flex-row items-center rounded-full py-2 px-4 border bg-slate-100 border-slate-200">
            <button
                type="button"
                disabled={isMinReached}
                className={`flex items-center justify-center ${isMinReached
                    ? "opacity-50 cursor-not-allowed text-slate-400"
                    : "cursor-pointer hover:opacity-70 text-slate-900"
                    }`}
                aria-label={t("ariaLabels.decreaseQuantity")}
                onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateQuantity(item.quantity - 1);
                }}
            >
                <Minus size={16} />
            </button>

            <p className="w-8 text-center m-0 tabular-nums">
                <span className="w-full text-sm font-medium">{item.quantity}</span>
            </p>

            <button
                type="button"
                disabled={isMaxReached}
                className={`flex items-center justify-center ${isMaxReached
                    ? "opacity-30 cursor-not-allowed text-slate-400"
                    : "cursor-pointer hover:opacity-70 text-slate-900"
                    }`}
                aria-label={t("ariaLabels.increaseQuantity")}
                onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateQuantity(item.quantity + 1);
                }}
            >
                <Plus size={16} />
            </button>
        </div>
    );
}