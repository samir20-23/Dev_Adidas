import { useState } from "react";
import { ShoppingCart, Home, Heart, User } from "lucide-react";
import '../css/cart.css'
export default function Cart() {
    const [isEmpty] = useState(true);

    return (
        <div className="cart-container">
            {/* Empty Cart State */}
            {isEmpty ? (
                <div className="empty-cart">
                    <div className="empty-cart-icon">
                        <ShoppingCart size={80} strokeWidth={1.5} />
                    </div>
                    <h2 className="empty-cart-title">Your cart is empty!</h2>
                    <p className="empty-cart-text">
                        Looks like you haven't added anything to your cart yet
                    </p>
                    <button className="start-shopping-btn">
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="cart-with-items">
                    {/* Cart items would go here */}
                </div>
            )}

            {/* Bottom Navigation */}
            <nav className="bottom-nav">
                <button className="nav-item">
                    <Home size={24} />
                </button>
                <button className="nav-item active">
                    <ShoppingCart size={24} />
                </button>
                <button className="nav-item">
                    <Heart size={24} />
                </button>
                <button className="nav-item">
                    <User size={24} />
                </button>
            </nav>
        </div>
    );
}