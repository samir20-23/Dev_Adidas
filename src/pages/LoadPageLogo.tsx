import Logo from "../components/logo_Comp/Logo";
import LineLoader from "../components/logo_Comp/Line_loader";
import "../css/LoadPageLogo.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoadPageLogo() {
    const navigate = useNavigate();

    useEffect(() => {
        const t = setTimeout(() => navigate('/home'), 3000);
        return () => clearTimeout(t);
    }, [navigate]);

    return (
        <div className="loadpagelogo">
            <Logo />
            <LineLoader />
        </div>
    );
}
