"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface CartItem {
    id: number;
    name: string;
    price: string;
    priceNum: number;
    image: string;
    size: string;
    color: string;
    quantity: number;
}

interface CartContextData {
    cartItems: CartItem[];
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: number, size: string, color: string) => void;
    updateQuantity: (id: number, size: string, color: string, delta: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("cartItems");
        if (stored) {
            try { setCartItems(JSON.parse(stored)); } catch { }
        }
    }, []);

    // Persist to localStorage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item: Omit<CartItem, "quantity">) => {
        setCartItems(prev => {
            const existing = prev.find(
                c => c.id === item.id && c.size === item.size && c.color === item.color
            );
            if (existing) {
                return prev.map(c =>
                    c.id === item.id && c.size === item.size && c.color === item.color
                        ? { ...c, quantity: c.quantity + 1 }
                        : c
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number, size: string, color: string) => {
        setCartItems(prev =>
            prev.filter(c => !(c.id === id && c.size === size && c.color === color))
        );
    };

    const updateQuantity = (id: number, size: string, color: string, delta: number) => {
        setCartItems(prev =>
            prev
                .map(c =>
                    c.id === id && c.size === size && c.color === color
                        ? { ...c, quantity: c.quantity + delta }
                        : c
                )
                .filter(c => c.quantity > 0)
        );
    };

    const clearCart = () => setCartItems([]);

    const totalItems = cartItems.reduce((sum, c) => sum + c.quantity, 0);
    const totalPrice = cartItems.reduce((sum, c) => sum + c.priceNum * c.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
