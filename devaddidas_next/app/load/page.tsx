"use client";
import Logo from "../components/logo_Comp/Logo";
import LineLoader from "../components/logo_Comp/Line_loader";
import "../css/LoadPageLogo.css";

export default function LoadPageLogo() {
    return (
        <div className="loadpagelogo">
            <Logo />
            <LineLoader />
        </div>
    );
}