"use client";

import Image from "next/image";
import Link from "next/link";
import { useFormatter } from "next-intl";
import { toast } from "sonner";
import { CartItem, useCartStore } from "@/features/cart/store";
import { Plus } from "lucide-react";
import { FragmentType, useFragment } from "@/gql/fragment-masking";
import { BOOK_CARD_FRAGMENT } from "@/lib/contentful/queries";
import { BookCardFragmentFragment } from "@/gql/graphql";
interface BookCardProps {
    data: FragmentType<typeof BOOK_CARD_FRAGMENT>;
}

export const BookCard = ({ data }: BookCardProps) => {
    const book = useFragment(BOOK_CARD_FRAGMENT, data) as BookCardFragmentFragment;
    const format = useFormatter();
    const addItem = useCartStore((state) => state.addItem);


    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: book.sys.id,
            title: book.title || "Unknown",
            price: book.price || 0,
            stock: book.stock ?? 0,
            quantity: 1,
            image: book.coverImage?.url || undefined,
        } as CartItem);
    };


    return (
        <Link
            href={`/storebook/${book.slug}`}
            className="group flex flex-col gap-3"
        >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100">
                {book.coverImage?.url && (
                    <Image
                        src={book.coverImage.url}
                        alt={book.coverImage.title || ""}
                        fill
                        className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
            </div>

            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-medium text-slate-900 leading-snug">{book.title}</h3>
                    <p className="text-sm text-slate-500">{book.author}</p>
                </div>

                <div className="text-right flex flex-col items-end gap-2">
                    <span className="font-mono text-sm font-medium text-slate-900">
                        {format.number(book.price || 0, { style: 'currency', currency: 'EUR' })}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white opacity-0 transition-all hover:bg-slate-700 group-hover:opacity-100 focus:opacity-100"
                        aria-label="Add to cart"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>
        </Link>
    );
};