import { ShoppingBasket } from "lucide-react";
import "../css/cart.css";

export default function Cart() {
    return (
        <div className="cart-page">
            <div className="cart-empty">
                <ShoppingBasket className="cart-empty-icon" strokeWidth={1.5} />
                <div className="cart-empty-text">Your cart is empty!</div>
            </div>
        </div>
    );
}