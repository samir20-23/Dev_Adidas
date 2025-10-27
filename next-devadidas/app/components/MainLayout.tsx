'use client';

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";
import Menubar from "./menubar";
import React from "react";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const pathname = usePathname();

    const hideNavPaths = ["/login", "/register", "/load", "/settings", "/start"];
    const hideFooterPaths = ["/settings", "/register"];
    const hideMenuPaths = ["/login", "/register", "/load", "/settings", "/start"];

    const showNav = !hideNavPaths.some(path => pathname.startsWith(path));
    const showFooter = hideFooterPaths.some(path => pathname.startsWith(path));
    const showMenu = !hideMenuPaths.some(path => pathname.startsWith(path));

    return (
        <div className="layout">
            {showNav && <Navbar />}
            <main className="main">
                {children}
            </main>
            {showFooter && <Footer />}
            {showMenu && <Menubar />}
        </div>
    );
}