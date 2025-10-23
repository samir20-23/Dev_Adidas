"use client"
import { useRouter } from "next/navigation";
import "../css/menubar.css";
import homeWhite from "../../../public/assets/navbar-icons/home-white.png"
import homeBlack from "../../../public/assets/navbar-icons/home-black.png"
import cartWhite from "../../../public/assets/navbar-icons/card-white.png"
import cartBlack from "../../../public/assets/navbar-icons/cart-black.png"
import heartWhite from "../../../public/assets/navbar-icons/heart-white.png"
import heartBlack from "../../../public/assets/navbar-icons/heart-black.png"
import profileWhite from "../../../public/assets/navbar-icons/profile-white.png"
import profileBlack from "../../../public/assets/navbar-icons/profile-black.png"
// import { useTheme } from "../contexts/ThemeContext";
import Image from "next/image";

export default function Menubar() {
    const router = useRouter();
    // const { theme } = useTheme();
    const theme = "light"

    return (
        <>
            <nav className="bottom-nav" >
                <button className="nav-item active" onClick={() => router.push("/home")}>
                    <Image src={theme === 'dark' ? homeWhite : homeBlack} id="iconsMenuBar" className="homeIcon" alt="home" />
                </button>
                <button className="nav-item" onClick={() => router.push("/cart")}>
                    <Image src={theme === 'dark' ? cartWhite : cartBlack} id="iconsMenuBar" className="cartIcon" alt="cart" />

                </button>
                <button className="nav-item" onClick={() => router.push("favorit")}>
                    <Image src={theme === 'dark' ? heartWhite : heartBlack} id="iconsMenuBar" className="heartIcon" alt="favorite" />

                </button>
                <button className="nav-item" onClick={() => router.push("/settings")}>
                    <Image src={theme === 'dark' ? profileWhite : profileBlack} id="iconsMenuBar" className="profileIcon" alt="profile" />

                </button>
            </nav>

        </>
    );
}
