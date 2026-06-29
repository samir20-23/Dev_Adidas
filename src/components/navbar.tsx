import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ShoppingBasket, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import "../css/navbar.css";
import { getCart } from "../utils/storage";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/home";
  const isSettings = location.pathname === '/settings';
  const { theme } = useTheme();
  const [cartCount, setCartCount] = useState(() => getCart().reduce((s, i) => s + i.quantity, 0));

  useEffect(() => {
    const update = () => setCartCount(getCart().reduce((s, i) => s + i.quantity, 0));
    window.addEventListener('cartUpdated', update);
    return () => window.removeEventListener('cartUpdated', update);
  }, []);

  const isDark = theme === 'dark';

  return (
    <nav className="app-navbar">
      <div className="navbar-left">
        {isHome ? (
          <div style={{ width: 32 }} />
        ) : (
          <button className="navbar-back-btn" onClick={() => isSettings ? navigate('/home') : navigate(-1)}>
            <ChevronLeft size={22} />
          </button>
        )}
      </div>

      <img
        src={isDark ? '/logoWhite.png' : '/logo.PNG'}
        alt="Adidas"
        className="navbar-logo"
      />

      <div className="navbar-right">
        <button className="navbar-icon-btn" onClick={() => navigate('/detail')}>
          <Heart size={22} />
        </button>
        <button className="navbar-icon-btn cart-btn" onClick={() => navigate('/cart')}>
          <ShoppingBasket size={22} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}
