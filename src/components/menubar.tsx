import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ShoppingBasket, Heart, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import '../css/menubar.css';
import { getCart } from '../utils/storage';

export default function Menubar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(() => getCart().reduce((s, i) => s + i.quantity, 0));

  useEffect(() => {
    const update = () => setCartCount(getCart().reduce((s, i) => s + i.quantity, 0));
    window.addEventListener('cartUpdated', update);
    return () => window.removeEventListener('cartUpdated', update);
  }, []);

  const navItems = [
    { icon: <Home size={22} />, path: '/home', label: 'Home' },
    { icon: <ShoppingBasket size={22} />, path: '/cart', label: 'Cart', badge: cartCount },
    { icon: <Heart size={22} />, path: '/detail', label: 'Wishlist' },
    { icon: <User size={22} />, path: '/settings', label: 'Profile' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map(item => {
        const isActive = location.pathname === item.path ||
          (item.path === '/home' && location.pathname.startsWith('/product'));
        return (
          <button
            key={item.path}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            {item.badge != null && item.badge > 0 && (
              <span className="nav-badge">{item.badge}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
