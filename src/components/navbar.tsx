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

  const navItems = [
    { label: "Home", path: "/home" },
    { label: "Wishlist", path: "/detail" },
    { label: "Cart", path: "/cart", badge: cartCount },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <nav className="app-navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <img
            src={isDark ? '/logoWhite.png' : '/logo.PNG'}
            alt="Adidas"
            className="navbar-logo-img"
            onClick={() => navigate('/home')}
            style={{ cursor: 'pointer' }}
          />
          {!isHome && (
            <button className="navbar-back-btn mobile-only" onClick={() => isSettings ? navigate('/home') : navigate(-1)}>
              <ChevronLeft size={22} />
            </button>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <div className="desktop-nav">
          {navItems.map(item => {
            const isActive = location.pathname === item.path ||
              (item.path === '/home' && location.pathname.startsWith('/product'));
            return (
              <button
                key={item.path}
                className={`desktop-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                {item.label}
                {item.badge != null && item.badge > 0 && (
                  <span className="desktop-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Navigation Icons */}
        <div className="navbar-right mobile-only">
          <button className="navbar-icon-btn" onClick={() => navigate('/detail')}>
            <Heart size={22} />
          </button>
          <button className="navbar-icon-btn cart-btn" onClick={() => navigate('/cart')}>
            <ShoppingBasket size={22} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}
