"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useCartStore } from "@/features/cart/store";
import { Button } from "@/components/ui/button";

export interface AddToCartContent {
    decreaseAria: string;
    increaseAria: string;
    addToCartBtn: string;
    maxQuantityErrorPrefix: string;
    maxQuantityErrorSuffix: string;
}

interface Props {
    book: {
        sys: { id: string };
        title: string;
        price: number;
        stock?: number;
        coverImage?: { url: string };
    };
    content: AddToCartContent;
}

export const AddToCart = ({ book, content }: Props) => {
    const addItem = useCartStore((state) => state.addItem);
    const items = useCartStore((state) => state.items);
    const openCart = useCartStore((state) => state.openCart);

    const [quantity, setQuantity] = useState<number>(1);
    const [isAdding, setIsAdding] = useState(false);

    const stock = book.stock ?? 0;
    const isAvailable = stock > 0;

    const currentInCart = items.find((i) => i.id === book.sys.id)?.quantity || 0;
    const availableToAdd = stock - currentInCart;

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (isNaN(val) || val < 1) {
            setQuantity(1);
        } else {
            setQuantity(val);
        }
    };

    const handleAddToCart = async () => {
        if (!isAvailable) return;

        if (quantity > availableToAdd) {
            toast.error(`${content.maxQuantityErrorPrefix} ${stock} ${content.maxQuantityErrorSuffix} ${book.title}`);
            return;
        }

        setIsAdding(true);
        await new Promise(resolve => setTimeout(resolve, 300));

        addItem({
            id: book.sys.id,
            title: book.title,
            price: book.price,
            quantity: quantity,
            image: book.coverImage?.url,
            stock: stock
        });

        setQuantity(1);
        setIsAdding(false);
        openCart();
    };

    return (
        <div className="flex gap-4 mt-10">
            <div className="flex gap-1 flex-row items-center rounded-[var(--radius-interaction)] py-2 px-4 border bg-bg-gray border-border">
                <button type="button" aria-label={content.decreaseAria} onClick={decrementQuantity}>
                    <Image className="cursor-pointer" src="/icons/icon-minus.svg" width={22} height={22} alt="Minus" />
                </button>
                <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-6 text-center border-none outline-none bg-transparent text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    min="1"
                />
                <button type="button" aria-label={content.increaseAria} onClick={incrementQuantity}>
                    <Image className="cursor-pointer" src="/icons/icon-plus.svg" width={22} height={22} alt="Plus" />
                </button>
            </div>
            <Button
                className="text-base w-48"
                variant="primary"
                stable
                onClick={handleAddToCart}
                disabled={!isAvailable || isAdding}
                isLoading={isAdding}
            >
                {content.addToCartBtn}
            </Button>
        </div>
    );
};