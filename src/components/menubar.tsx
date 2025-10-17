import { Search, Menu, ChevronRight, Heart, ShoppingCart, Home as HomeIcon, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../css/menubar.css";
import homeWhite from "../assets/navbar-icons/home-white.png"
import homeBlack from "../assets/navbar-icons/home-black.png"
import cartWhite from "../assets/navbar-icons/card-white.png"
import cartBlack from "../assets/navbar-icons/cart-black.png"
import heartWhite from "../assets/navbar-icons/heart-white.png"
import heartBlack from "../assets/navbar-icons/heart-black.png"
import profileWhite from "../assets/navbar-icons/profile-white.png"
import profileBlack from "../assets/navbar-icons/profile-black.png"

export default function Menubar() {
    const navigate = useNavigate();

    return (
        <>
            <nav className="bottom-nav" >
                <button className="nav-item active" onClick={() => navigate("/home")}>
                    <img src={homeBlack} id="iconsMenuBar" className="homeIcon" />
                </button>
                <button className="nav-item" onClick={() => navigate("/cart")}>
                    <img src={cartBlack} id="iconsMenuBar" className="cartIcon" />

                </button>
                <button className="nav-item" onClick={() => navigate("favorit")}>
                    <img src={heartBlack} id="iconsMenuBar" className="heartIcon" />

                </button>
                <button className="nav-item" onClick={() => navigate("/settings")}>
                    <img src={profileBlack} id="iconsMenuBar" className="profileIcon" />

                </button>
            </nav>

        </>
    );
}
