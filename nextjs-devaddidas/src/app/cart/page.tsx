'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { useTranslation } from 'react-i18next';
import { ShoppingCart, Trash2 } from 'lucide-react';
import '../../../src/css/cart.css';

export default function Cart() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const router = useRouter();
    // const { t } = useTranslation();
    const t = (key: string) => key; // Placeholder for translation

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const removeFromCart = (id: number) => {
        const newCart = cartItems.filter((item: any) => item.id !== id);
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    return (
        <div className="cart-container">
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <div className="empty-cart-icon">
                        <ShoppingCart size={80} strokeWidth={1.5} />
                    </div>
                    <h2 className="empty-cart-title">{t('cart.emptyTitle')}</h2>
                    <p className="empty-cart-text">{t('cart.emptyText')}</p>
                    <button className="start-shopping-btn" onClick={() => router.push('/home')}>
                        {t('cart.startShopping')}
                    </button>
                </div>
            ) : (
                <div className="cart-with-items">
                    {cartItems.map((item: any) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} />
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <p>{item.price}</p>
                            </div>
                            <button onClick={() => removeFromCart(item.id)}>
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}