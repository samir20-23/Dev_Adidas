import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ShoppingBasket, Heart, User } from 'lucide-react';
import '../css/menubar.css';

export default function Menubar() {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { icon: <Home size={22} />, path: '/home' },
        { icon: <ShoppingBasket size={22} />, path: '/cart' },
        { icon: <Heart size={22} />, path: '/detail' }, // assuming detail is favorites for now, or just /favorites
        { icon: <User size={22} />, path: '/settings' },
    ];

    // Some mapping to match routes, e.g. /product/1 should keep Home active?
    // Let's just do exact match or startsWith for some.
    
    return (
        <nav className="bottom-nav">
            {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                    <button
                        key={item.path}
                        className={`nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => navigate(item.path)}
                    >
                        {item.icon}
                    </button>
                );
            })}
        </nav>
    );
}
