import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ShoppingBasket, Heart, Bell } from "lucide-react";
import "../css/navbar.css";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    // Just an example logic: if not home, show back button on left
    const isHome = location.pathname === "/home" || location.pathname === "/";

    return (
        <nav className="app-navbar">
            <div className="navbar-left">
                {!isHome ? (
                    <button className="navbar-left" onClick={() => navigate(-1)}>
                        <ChevronLeft size={22} />
                    </button>
                ) : (
                    <div style={{ width: 22 }}></div> // placeholder for spacing
                )}
            </div>
            
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" 
                alt="Adidas" 
                className="navbar-logo" 
            />
            
            <div className="navbar-right">
                <button className="navbar-icon-btn" onClick={() => navigate('/detail')}>
                    <Heart size={22} />
                </button>
                <button className="navbar-icon-btn" onClick={() => navigate('/cart')}>
                    <ShoppingBasket size={22} />
                </button>
            </div>
        </nav>
    );
}
