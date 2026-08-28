"use client"
import { useRouter, usePathname } from "next/navigation";
import "../css/menubar.css";
import homeWhite from "../../public/assets/navbar-icons/home-white.png"
import homeBlack from "../../public/assets/navbar-icons/home-black.png"
import cartWhite from "../../public/assets/card-white-icon.png"
import cartBlack from "../../public/assets/navbar-icons/cart-black.png"
import heartWhite from "../../public/assets/navbar-icons/heart-white.png"
import heartBlack from "../../public/assets/navbar-icons/heart-black.png"
import profileWhite from "../../public/assets/navbar-icons/profile-white.png"
import profileBlack from "../../public/assets/navbar-icons/profile-black.png"
import { useTheme } from "../contexts/ThemeContext";
import { useCart } from "../contexts/CartContext";
import Image from "next/image";

export default function Menubar() {
    const navigate = useRouter();
    const pathname = usePathname();
    const { theme } = useTheme();
    const { totalItems } = useCart();

    const isActive = (path: string) => pathname.startsWith(path);

    return (
        <>
            <nav className="bottom-nav">
                <button
                    className={`nav-item ${isActive("/home") ? "active" : ""}`}
                    onClick={() => navigate.push("/home")}
                    aria-label="Home"
                >
                    <Image
                        src={theme === 'dark' ? homeWhite : homeBlack}
                        id="iconsMenuBar"
                        className="homeIcon"
                        alt="home"
                        style={{ width: '24px', height: '24px' }}
                    />
                </button>

                <button
                    className={`nav-item ${isActive("/cart") ? "active" : ""}`}
                    onClick={() => navigate.push("/cart")}
                    aria-label="Cart"
                    style={{ position: "relative" }}
                >
                    <Image
                        src={theme === 'dark' ? cartWhite : cartBlack}
                        id="iconsMenuBar"
                        className="cartIcon"
                        alt="cart"
                        style={{ width: '24px', height: '24px' }}
                    />
                    {totalItems > 0 && (
                        <span className="cart-badge">{totalItems > 9 ? "9+" : totalItems}</span>
                    )}
                </button>

                <button
                    className={`nav-item ${isActive("/favorit") ? "active" : ""}`}
                    onClick={() => navigate.push("/favorit")}
                    aria-label="Favourites"
                >
                    <Image
                        src={theme === 'dark' ? heartWhite : heartBlack}
                        id="iconsMenuBar"
                        className="heartIcon"
                        alt="favourites"
                        style={{ width: '24px', height: '24px' }}
                    />
                </button>

                <button
                    className={`nav-item ${isActive("/settings") ? "active" : ""}`}
                    onClick={() => navigate.push("/settings")}
                    aria-label="Settings"
                >
                    <Image
                        src={theme === 'dark' ? profileWhite : profileBlack}
                        id="iconsMenuBar"
                        className="profileIcon"
                        alt="settings"
                        style={{ width: '24px', height: '24px' }}
                    />
                </button>
            </nav>
        </>
    );
}
