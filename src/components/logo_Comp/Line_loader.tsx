import { useEffect } from "react";
import "../css_comp/logo.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

export default function Line_loader() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/home");
        }, 2100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="logo-wrapper" style={{ color: isDark ? '#fff' : '#000' }}>
            <div className="logo-loader" />
        </div>
    );
}
