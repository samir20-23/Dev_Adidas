"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import '../css/cart.css';

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
    const router = useRouter();
    const { t } = useTranslation();

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
                    <h2 className="cart-title">{t('cart.title', 'My Cart')} ({totalItems})</h2>

                    <div className="cart-items-list">
                        {cartItems.map((item) => (
                            <div key={`${item.id}-${item.size}-${item.color}`} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-img" />
                                <div className="cart-item-details">
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <p className="cart-item-meta">Size: {item.size} · {item.color}</p>
                                    <p className="cart-item-price">{item.price}</p>
                                    <div className="cart-item-qty">
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(item.id, item.size, item.color, -1)}
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="qty-value">{item.quantity}</span>
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(item.id, item.size, item.color, 1)}
                                            aria-label="Increase quantity"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                                <button
                                    className="cart-remove-btn"
                                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                                    aria-label="Remove item"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="cart-summary-row">
                            <span>{t('cart.subtotal', 'Subtotal')}</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="cart-summary-row">
                            <span>{t('cart.shipping', 'Shipping')}</span>
                            <span>{totalPrice >= 50 ? t('cart.free', 'Free') : '$9.99'}</span>
                        </div>
                        <div className="cart-summary-row cart-summary-total">
                            <span>{t('cart.total', 'Total')}</span>
                            <span>${(totalPrice >= 50 ? totalPrice : totalPrice + 9.99).toFixed(2)}</span>
                        </div>
                        <button
                            className="checkout-btn"
                            onClick={() => router.push('/checkout')}
                        >
                            {t('cart.checkout', 'Proceed to Checkout')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}