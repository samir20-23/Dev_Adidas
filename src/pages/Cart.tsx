import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Home, Heart, User, Trash2 } from "lucide-react";
import '../css/cart.css'





export default function Cart() {
    const [cartItems, setCartItems] = useState<any[]>([]);


    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const removeFromCart = (id: number) => {
        const newCart = cartItems.filter((item: any) => item.id !== id);
        setCartItems(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    return (
        <div className="cart-container">
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <div className="empty-cart-icon">
                        <ShoppingCart size={80} strokeWidth={1.5} />
                    </div>
                    <h2 className="empty-cart-title">Your cart is empty!</h2>
                    <p className="empty-cart-text">
                        Looks like you haven't added anything to your cart yet
                    </p>
                    <button className="start-shopping-btn" onClick={() => navigate('/')}>
                        Start Shopping
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

            {/* Bottom Navigation */}
            {/* <nav className="bottom-nav">
                <button className="nav-item" onClick={() => navigate('/')}>
                    <Home size={24} />
                </button>
                <button className="nav-item active" onClick={() => navigate('/cart')}>
                    <ShoppingCart size={24} />
                </button>
                <button className="nav-item">
                    <Heart size={24} />
                </button>
                <button className="nav-item" onClick={() => navigate('/settings')}>
                    <User size={24} />
                </button>
            </nav> */}
        </div>
    );
}