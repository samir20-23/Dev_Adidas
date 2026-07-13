// src/components/Logo.tsx
import "../css_comp/logo.css";
import { useTheme } from "../../contexts/ThemeContext";

export default function Logo() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="logo-wrapper">
            <img
                src={isDark ? '/logoWhite.png' : '/logo.PNG'}
                alt="Adidas"
                className="logo-img"
            />
        </div>
    );
}
