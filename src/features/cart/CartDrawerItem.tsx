"use client";

import { useTranslations, useFormatter } from "next-intl";
import Image from "next/image";
import EditQuantity from "./EditQuantity";
import { useCartStore, type CartItem } from "@/features/cart/store";

interface Props {
    readonly item: CartItem;
}

export default function CartDrawerItem({ item }: Props): React.ReactNode {
    const t = useTranslations("Cart");
    const format = useFormatter();
    const { removeItem } = useCartStore();

    if (!item) return null;

    return (
        <div className="border-b border-border pb-4 mb-4 flex gap-4">
            <div className="w-[70px] shrink-0">
                <div className="relative aspect-square shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                    {item.image ? (
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="70px"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">No Img</div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-1 flex-grow">
                <h3 className="text-base font-medium">{item.title}</h3>
                {item.subtitle && (
                    <span className="text-gray-500 font-medium text-sm">
                        {item.subtitle}
                    </span>
                )}

                <div className="flex gap-1">
                    <span className="font-semibold text-base">
                        {format.number(item.price, { style: 'currency', currency: 'EUR' })}
                    </span>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <EditQuantity item={item} />

                    <button
                        type="button"
                        className="cursor-pointer hover:opacity-70 flex items-center justify-center"
                        aria-label={t("ariaLabels.deleteItem")}
                        onClick={() => removeItem(item.id)}
                    >
                        <Image
                            src="/icons/icon-trash.svg"
                            width={22}
                            height={22}
                            alt=""
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}