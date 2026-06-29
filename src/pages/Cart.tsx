import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBasket, Trash2, Plus, Minus } from "lucide-react";
import "../css/cart.css";
import { getCart, removeFromCart, updateQty, type CartItem } from "../utils/storage";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);

  const refresh = () => setCart(getCart());

  useEffect(() => {
    refresh();
    window.addEventListener('cartUpdated', refresh);
    return () => window.removeEventListener('cartUpdated', refresh);
  }, []);

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <ShoppingBasket className="cart-empty-icon" strokeWidth={1.5} />
          <div className="cart-empty-text">Your cart is empty!</div>
          <button className="btn-continue-shopping" onClick={() => navigate('/home')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-list">
        {cart.map(item => (
          <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
            <img src={item.images[0]} alt={item.name} className="cart-item-img" />
            <div className="cart-item-info">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-size">Size: {item.selectedSize}</div>
              <div className="cart-item-price">${item.price * item.quantity}</div>
            </div>
            <div className="cart-item-actions">
              <button className="qty-btn" onClick={() => {
                if (item.quantity > 1) { updateQty(item.id, item.selectedSize, item.quantity - 1); refresh(); }
                else { removeFromCart(item.id, item.selectedSize); refresh(); }
              }}><Minus size={14} /></button>
              <span className="qty-num">{item.quantity}</span>
              <button className="qty-btn" onClick={() => { updateQty(item.id, item.selectedSize, item.quantity + 1); refresh(); }}>
                <Plus size={14} />
              </button>
              <button className="remove-btn" onClick={() => { removeFromCart(item.id, item.selectedSize); refresh(); }}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total-row">
          <span>Total</span>
          <span className="cart-total-amount">${total}</span>
        </div>
        <button className="btn-checkout" onClick={() => navigate('/payment')}>
          Checkout
        </button>
      </div>
    </div>
  );
}
