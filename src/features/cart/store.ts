import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
    id: string;
    title: string;
    subtitle?: string;
    image?: string;
    price: number;
    stock: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            isOpen: false,
            addItem: (newItem) => set((state) => {
                const existingItem = state.items.find((i) => i.id === newItem.id);
                if (existingItem) {
                    const newQuantity = existingItem.quantity + newItem.quantity;
                    return {
                        items: state.items.map((i) =>
                            i.id === newItem.id ? { ...i, quantity: newQuantity } : i
                        )
                    };
                }
                return { items: [...state.items, { ...newItem, quantity: newItem.quantity }] };
            }),
            removeItem: (id) => set((state) => ({
                items: state.items.filter((i) => i.id !== id)
            })),
            updateQuantity: (id, quantity) => set((state) => ({
                items: state.items.map((i) =>
                    i.id === id ? { ...i, quantity } : i
                )
            })),
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'shopping-cart-storage',
            storage: createJSONStorage(() => localStorage),
            skipHydration: true,
        }
    )
);